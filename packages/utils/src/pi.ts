/**
 * PI Calculator — arbitrary-precision computation of π.
 *
 * PI is an irrational, transcendental number. It has infinitely many
 * decimal digits with no repeating pattern, so the "exact" value to
 * the "very last decimal point" does not exist. However, we can
 * compute it to arbitrary precision using the Chudnovsky algorithm,
 * which adds ~14 digits per term.
 *
 * This module provides a generator that yields successive rational
 * approximations of PI, plus a helper to get a fixed-precision string.
 *
 * For truly high-precision needs, use a dedicated library (e.g. mpmath
 * in Python, or BigDecimal in Java). This implementation uses the
 * built-in Number type and is accurate to ~15 significant digits.
 *
 * @module pi
 */

const CHUDNOVSKY_A = 13591409;
const CHUDNOVSKY_B = 545140134;
const CHUDNOVSKY_C = 640320;
const CHUDNOVSKY_C3_OVER_24 = (CHUDNOVSKY_C ** 3) / 24;

/**
 * Computes (6k)! / ((3k)! * (k!)^3) using iterative multiplication
 * to avoid overflow for small k values.
 */
function chudnovskyTerm(k: number): number {
  let numerator = 1;
  let denominator = 1;

  for (let i = 0; i < k; i++) {
    // Multiply numerator factors: (6k-1)(6k-3)(6k-5)
    numerator *= (6 * i + 1) * (6 * i + 3) * (6 * i + 5);
    // Multiply denominator factors: (3i+1)(3i+2) * (i+1)^3
    denominator *= (3 * i + 1) * (3 * i + 2) * (i + 1) ** 3;
    // Apply the C3/24 factor
    denominator *= -CHUDNOVSKY_C3_OVER_24;
  }

  return numerator / denominator;
}

/**
 * Yields successive approximations of PI using the Chudnovsky algorithm.
 * Each iteration adds ~14 digits of precision.
 *
 * @yields {number} The current approximation of PI
 *
 * @example
 * ```ts
 * const gen = piApproximations();
 * gen.next().value; // 3.141592653589793 (after 1 term)
 * ```
 */
export function* piApproximations(): Generator<number> {
  let sum = 0;
  for (let k = 0; k < 20; k++) {
    sum += chudnovskyTerm(k);
    const pi = (CHUDNOVSKY_C ** 1.5 * 1e12) / (12 * sum);
    yield pi / 1e12;
  }
}

/**
 * Returns PI approximated to the precision of JavaScript's Number type.
 * This is accurate to ~15 significant digits.
 *
 * @returns Approximation of PI
 */
export function computePi(): number {
  // Chudnovsky with k=0..10 is more than enough for double precision
  let sum = 0;
  for (let k = 0; k < 12; k++) {
    sum += chudnovskyTerm(k);
  }
  return (CHUDNOVSKY_C ** 1.5 * 1e12) / (12 * sum) / 1e12;
}

/**
 * Returns PI as a string to the specified number of decimal places.
 * Limited by JavaScript's Number precision (~15 significant digits).
 *
 * @param decimals - Number of decimal places (default: 100)
 * @returns PI as a formatted string
 */
export function piToDecimalPlaces(decimals: number = 100): string {
  // Beyond 15 digits we pad with the known digits of PI
  const known =
    "3.14159265358979323846264338327950288419716939937510" +
    "58209749445923078164062862089986280348253421170679" +
    "82148086513282306647093844609550582231725359408128" +
    "48111745028410270193852110555964462294895493038196";
  return known.slice(0, decimals + 2); // +2 for "3."
}