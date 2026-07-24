/**
 * @taskflow/pi — High-precision PI calculator using Machin's formula
 * with BigInt integer arithmetic.
 *
 * Why π has no final decimal digit:
 *   π is an irrational number — its decimal expansion is infinite and non-repeating.
 *   Any finite computer can only compute a finite prefix. This package computes
 *   the exact requested prefix using arbitrary-precision integer arithmetic
 *   (BigInt), with guard digits for correct rounding.
 *
 * Algorithm (Machin's formula, 1706):
 *   π/4 = 4·arctan(1/5) − arctan(1/239)
 *
 *   arctan(x) = x − x³/3 + x⁵/5 − x⁷/7 + ... (Gregory series)
 *
 *   Using BigInt fixed-point arithmetic at 10^precision scale:
 *   arctan(1/n) = Σ_{k=0}^{∞} (-1)^k / ((2k+1) · n^(2k+1))
 *
 *   Convergence: each term of arctan(1/5) adds ~0.7 digits
 *                each term of arctan(1/239) adds ~2.4 digits
 *
 * @module @taskflow/pi
 */

import { createHash } from "node:crypto";

/**
 * Compute arctan(1/n) using the Gregory series with BigInt fixed-point arithmetic.
 * Returns floor(10^precision * arctan(1/n)).
 *
 * arctan(1/n) = Σ_{k=0}^{∞} (-1)^k / ((2k+1) · n^(2k+1))
 *
 * @param {bigint} n — denominator (5 or 239 for Machin's formula)
 * @param {number} precision — number of decimal digits
 * @returns {bigint} floor(10^precision * arctan(1/n))
 */
function arctanInv(n, precision) {
  const N = BigInt(n);
  const NN = N * N; // n²
  const scale = 10n ** BigInt(precision);

  // First term: 1/n, scaled by 10^precision
  let term = scale / N;
  let sum = term;
  let k = 1n;

  while (term > 0n) {
    // term(k) = (-1)^k / ((2k+1) · n^(2k+1))
    // term(k) = -term(k-1) * (2k-1) / (n² · (2k+1))
    const numerator = BigInt(2 * Number(k) - 1);
    const denominator = NN * BigInt(2 * Number(k) + 1);
    term = (term * numerator) / denominator;

    if (term === 0n) break;

    if (k % 2n === 0n) {
      sum += term; // even k: positive term
    } else {
      sum -= term; // odd k: negative term
    }

    k++;
  }

  return sum;
}

/**
 * Compute π to the specified number of decimal digits using Machin's formula.
 *
 * π = 4 · (4·arctan(1/5) − arctan(1/239))
 *
 * @param {number} digits — Number of decimal places (0 returns "3")
 * @returns {{ pi: string, certificate: object }}
 */
export function computePi(digits) {
  if (digits <= 0) {
    return {
      pi: "3",
      certificate: {
        digits: 0,
        algorithm: "machin-bigint",
        prefix: "3",
        sha256: createHash("sha256").update("3").digest("hex"),
      },
    };
  }

  const guard = 5;
  const totalDigits = digits + guard;

  // Compute arctan(1/5) and arctan(1/239) with extra guard precision
  const a5 = arctanInv(5n, totalDigits);
  const a239 = arctanInv(239n, totalDigits);

  // π/4 = 4·arctan(1/5) − arctan(1/239)
  // π = 16·arctan(1/5) − 4·arctan(1/239)
  const piScaled = 16n * a5 - 4n * a239;

  const piStr = piScaled.toString();

  let intPart, fracPart;
  if (piStr.length <= totalDigits) {
    const padded = piStr.padStart(totalDigits + 1, "0");
    intPart = padded.slice(0, padded.length - totalDigits);
    fracPart = padded.slice(padded.length - totalDigits);
  } else {
    intPart = piStr.slice(0, piStr.length - totalDigits);
    fracPart = piStr.slice(piStr.length - totalDigits);
  }

  // Just truncate the guard digits — since all operations use floor division,
  // the result is always <= true π, so truncation is correct.
  const pi = intPart + "." + fracPart.slice(0, digits);

  // Build certificate
  const fullStr = pi;
  const sha = createHash("sha256").update(fullStr).digest("hex");

  const certificate = {
    digits,
    algorithm: "machin-bigint",
    guard_digits: guard,
    sha256: sha,
    chunk_size: 50,
    chunks: [],
  };

  for (let i = 0; i < fracPart.slice(0, digits).length; i += 50) {
    const chunk = fracPart.slice(0, digits).slice(i, i + 50);
    certificate.chunks.push({
      start: i,
      end: Math.min(i + 50, digits),
      sha256: createHash("sha256")
        .update(intPart + "." + fracPart.slice(0, digits).slice(0, i + chunk.length))
        .digest("hex"),
    });
  }

  return { pi, certificate };
}

/**
 * Verify π string against known reference.
 * @param {string} pi — π string to verify
 * @param {number} digits — Expected decimal digits
 */
export function verifyPi(pi, digits) {
  const ref =
    "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
  const actual = pi.slice(0, Math.min(pi.length, ref.length));
  const valid = actual === ref.slice(0, actual.length);
  return { valid, reference: ref.slice(0, actual.length) };
}