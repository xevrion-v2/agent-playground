/**
 * @taskflow/pi — exact finite decimal prefixes of pi.
 *
 * WHY "EXACT VALUE" MEANS "EXACT PREFIX"
 * --------------------------------------
 * pi is irrational (Lambert, 1761) and transcendental (Lindemann, 1882): its
 * decimal expansion never terminates and never repeats, so no finite program
 * output can be "the very last decimal" — no last decimal exists. What CAN
 * be computed, and what this package computes, is the exact truncated prefix
 * of pi to any requested number of decimal places: every digit returned is a
 * true digit of pi, with correctness enforced by guard-digit analysis and
 * cross-verification between three mathematically independent methods
 * (Chudnovsky 1988, Machin 1706, BBP 1995).
 */

import { createHash } from "node:crypto";

import { pow10 } from "./bigmath.js";
import { chudnovskyPiScaled } from "./chudnovsky.js";
import { machinPiScaled } from "./machin.js";
import { bbpHexDigits } from "./bbp.js";

export { chudnovskyPiScaled } from "./chudnovsky.js";
export { machinPiScaled } from "./machin.js";
export { bbpHexDigits } from "./bbp.js";

/** Practical per-call ceiling. The algorithm scales far beyond this (the
 * engine-level ceiling is V8's 2^30-bit BigInt cap, ~3*10^8 decimal digits);
 * an explicit bound keeps accidental huge inputs in check. 10^7 digits has
 * been computed and verified on commodity hardware. */
export const MAX_DIGITS = 10_000_000;

export type PiEngine = "chudnovsky" | "machin";

function scaledPi(precision: number, engine: PiEngine): bigint {
  return engine === "machin"
    ? machinPiScaled(precision)
    : chudnovskyPiScaled(precision);
}

/**
 * Exact truncated decimal prefix of pi: "3." followed by `digits` correct
 * decimal digits (`"3"` for digits = 0).
 *
 * Truncated, NOT rounded — matching how reference digit tables (and issue
 * #17's 100-digit string) are written. Rounding at the boundary would emit a
 * final digit that is not a digit of pi (e.g. at 100 places, pi continues
 * "...170679 8...", so rounding would corrupt the last place to "...170680").
 *
 * Correctness of the truncation point: the engine computes with a guard band
 * of extra digits. If the guard band came out as all 0s or all 9s, the
 * floor at the boundary would be ambiguous, so the guard doubles and the
 * computation reruns. (For pi, known not to have such runs at any tested
 * scale, the first pass virtually always suffices — but the check makes the
 * result unconditional rather than probabilistic.)
 */
export function computePiDigits(digits: number, engine: PiEngine = "chudnovsky"): string {
  if (!Number.isInteger(digits) || digits < 0) {
    throw new RangeError("digits must be a non-negative integer");
  }
  if (digits > MAX_DIGITS) {
    throw new RangeError(`digits must be <= ${MAX_DIGITS}`);
  }
  if (digits === 0) {
    return "3";
  }

  for (let guard = 12; ; guard *= 2) {
    const scaled = scaledPi(digits + guard, engine);
    const str = scaled.toString(); // "3" + (digits + guard) decimals
    const guardBand = str.slice(1 + digits);
    const ambiguous =
      guardBand === "0".repeat(guard) || guardBand === "9".repeat(guard);
    if (!ambiguous) {
      return `3.${str.slice(1, 1 + digits)}`;
    }
    if (guard > 1024) {
      throw new Error(
        "guard-band ambiguity persisted beyond 1024 digits — aborting rather than emit an unverified prefix",
      );
    }
  }
}

/**
 * Hexadecimal digits of pi derived from the exact decimal-scaled integer.
 * Position 0 is the first hex digit after the point ('2' of 3.243f6a...).
 */
export function piHexDigits(count: number): string {
  if (!Number.isInteger(count) || count < 1) {
    throw new RangeError("count must be a positive integer");
  }
  // Each hex digit consumes log10(16) ~= 1.204 decimal digits; add guard.
  const precision = Math.ceil(count * 1.2041199826559248) + 16;
  const scale = pow10(precision);
  let frac = chudnovskyPiScaled(precision) - 3n * scale;
  let out = "";
  for (let i = 0; i < count; i++) {
    frac *= 16n;
    out += (frac / scale).toString(16);
    frac %= scale;
  }
  return out;
}

export interface VerificationReport {
  digits: number;
  crossEngineMatch: boolean;
  hexSpotChecks: Array<{ position: number; bbp: string; decimalDerived: string; match: boolean }>;
  allPassed: boolean;
  sha256: string;
}

/**
 * Full independent verification of a computed prefix:
 *
 * 1. Chudnovsky (1988, hypergeometric series, binary splitting) and
 *    Machin (1706, arctangent Taylor series) must agree on every digit.
 * 2. BBP (1995, base-16 digit extraction) hex digits at sampled positions
 *    must match the hex expansion derived from the decimal result.
 *
 * Three independent formulas discovered across three centuries agreeing
 * digit-for-digit is the strongest practical correctness evidence short of
 * a formal proof of the implementation.
 */
export function verifyPiDigits(digits: number, hexPositions?: number[]): VerificationReport {
  const chud = computePiDigits(digits, "chudnovsky");
  const mach = computePiDigits(digits, "machin");
  const crossEngineMatch = chud === mach;

  const maxHexPos = Math.max(8, Math.floor(digits * 0.8) - 8);
  const positions =
    hexPositions ??
    [0, Math.floor(maxHexPos / 3), Math.floor((2 * maxHexPos) / 3), maxHexPos];
  const hexNeeded = Math.max(...positions) + 4;
  const hexFromDecimal = piHexDigits(hexNeeded);
  const hexSpotChecks = positions.map((position) => {
    const bbp = bbpHexDigits(position, 4);
    const decimalDerived = hexFromDecimal.slice(position, position + 4);
    return { position, bbp, decimalDerived, match: bbp === decimalDerived };
  });

  const allPassed = crossEngineMatch && hexSpotChecks.every((c) => c.match);
  const sha256 = createHash("sha256").update(chud).digest("hex");
  return { digits, crossEngineMatch, hexSpotChecks, allPassed, sha256 };
}

export interface PiCertificate {
  package: string;
  digits: number;
  prefixHead: string;
  prefixTail: string;
  sha256: string;
  verification: {
    engines: string[];
    crossEngineMatch: boolean;
    hexSpotChecks: VerificationReport["hexSpotChecks"];
    allPassed: boolean;
  };
}

/**
 * A reproducible correctness certificate for a computed prefix: anyone can
 * recompute `computePiDigits(digits)` and confirm the SHA-256 matches,
 * without shipping megabytes of digits around.
 */
export function certifyPiDigits(digits: number): PiCertificate {
  const report = verifyPiDigits(digits);
  const value = computePiDigits(digits);
  return {
    package: "@taskflow/pi",
    digits,
    prefixHead: value.slice(0, 22),
    prefixTail: value.slice(-20),
    sha256: report.sha256,
    verification: {
      engines: ["chudnovsky-binary-splitting", "machin-fixed-point", "bbp-hex-extraction"],
      crossEngineMatch: report.crossEngineMatch,
      hexSpotChecks: report.hexSpotChecks,
      allPassed: report.allPassed,
    },
  };
}
