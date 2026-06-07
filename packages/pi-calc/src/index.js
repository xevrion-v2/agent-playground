/**
 * @fileoverview High-precision PI calculator using Machin's formula
 * with BigInt fixed-point arithmetic for deterministic output.
 *
 * Machin's formula:
 *   π/4 = 4·arctan(1/5) - arctan(1/239)
 *   π   = 16·arctan(1/5) - 4·arctan(1/239)
 *
 * where arctan(x) = x - x³/3 + x⁵/5 - x⁷/7 + ...
 *
 * @module pi-calc
 */

/**
 * Compute PI to the specified number of decimal digits.
 *
 * @param {number} [digits=100] - Number of fractional digits (0–100000).
 * @returns {string} PI as "3.<digits>"
 *
 * @example
 * computePi(50)
 * // => "3.14159265358979323846264338327950288419716939937510"
 */
export function computePi(digits = 100) {
  if (digits < 0 || digits > 100_000) {
    throw new RangeError("digits must be between 0 and 100000");
  }
  if (digits === 0) return "3.";

  // Extra guard digits to absorb rounding errors
  const guard = 12;
  const totalDigits = digits + guard;

  // Scale: 10^totalDigits — we compute PI * scale as a BigInt
  const scale = 10n ** BigInt(totalDigits);

  // Machin: π = 16·arctan(1/5) - 4·arctan(1/239)
  const piTimesScale =
    16n * arctanInvX(5n, totalDigits, scale) -
    4n * arctanInvX(239n, totalDigits, scale);

  // Convert to string — piTimesScale is PI * 10^totalDigits
  const s = piTimesScale.toString().padStart(totalDigits + 1, "0");
  const intPart = s.slice(0, s.length - totalDigits);
  const fracPart = s.slice(s.length - totalDigits);

  return `${intPart}.${fracPart.slice(0, digits)}`;
}

/**
 * Compute arctan(1/x) * scale using Machin's series.
 *
 * arctan(1/x) = 1/x - 1/(3·x³) + 1/(5·x⁵) - 1/(7·x⁷) + ...
 *
 * @param {bigint} x - Must be > 1.
 * @param {number} digits - Number of decimal digits to track.
 * @param {bigint} scale - 10^digits
 * @returns {bigint} arctan(1/x) * scale
 */
function arctanInvX(x, digits, scale) {
  // x is small (5 or 239), scale is 10^digits, so precision/5 is large.
  // The series converges faster for larger x (fewer terms).
  const xSq = x * x;
  let sum = scale / x; // first term: 1/x
  let term = sum;
  let divisor = 1n;
  let powerOfX = x;
  let sign = -1n;

  // Continue until term contributes less than 1 in the last digit
  while (term > 0n) {
    divisor += 2n;
    powerOfX *= xSq;
    term = scale / (divisor * powerOfX);
    if (term === 0n) break;
    sum += sign * term;
    sign = -sign;
  }

  return sum;
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

/**
 * Run the PI calculator from the command line.
 * @param {string[]} args
 */
export function runCLI(args) {
  const digits = parseInt(args[0] || "100", 10);
  const showJson = args.includes("--json");

  const start = Date.now();
  const pi = computePi(digits);
  const elapsed = Date.now() - start;

  if (showJson) {
    console.log(JSON.stringify({ pi, digits, elapsed_ms: elapsed }, null, 2));
  } else {
    console.log(pi);
    console.error(`digits: ${digits} fractional (${digits + 1} total chars)`);
    console.error(`time: ${elapsed}ms`);
  }
}
