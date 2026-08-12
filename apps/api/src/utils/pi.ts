/**
 * Pi Calculation Utility
 *
 * This module provides algorithms to calculate the mathematical constant Pi (π)
 * using different mathematical approaches, including:
 *
 * 1. Leibniz Formula for Pi
 *    - Formula: π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 *    - Approach: Alternating series with odd denominators.
 *    - Convergence: Extremely slow. It requires about 10,000 terms to get 4 correct decimal places.
 *    - Time Complexity: O(n) where n is the number of iterations.
 *
 * 2. Nilakantha Series
 *    - Formula: π = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + ...
 *    - Approach: Alternating series where each term has a denominator of the product of three consecutive integers.
 *    - Convergence: Much faster than Leibniz. Gets to 15 decimal places (floating point limit) in about 1,000 iterations.
 *    - Time Complexity: O(n) where n is the number of iterations.
 *
 * 3. Machin-like Formula (Arbitrary Precision using BigInt)
 *    - Formula: π/4 = 4 * arctan(1/5) - arctan(1/239)
 *    - Approach: Uses the Taylor series expansion for arctan(x) = x - x^3/3 + x^5/5 - ...
 *      with BigInt to generate arbitrary decimal precision digits of Pi.
 *    - Time Complexity: O(d * log(d)) where d is the number of digits.
 */

/**
 * Calculates Pi using the Leibniz formula.
 *
 * @param iterations - The number of terms to sum in the series.
 * @returns An approximation of Pi.
 */
export function calculatePiLeibniz(iterations: number): number {
  if (iterations <= 0) return 0;
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    const term = 1 / (2 * i + 1);
    if (i % 2 === 0) {
      sum += term;
    } else {
      sum -= term;
    }
  }
  return sum * 4;
}

/**
 * Calculates Pi using the Nilakantha series.
 *
 * @param iterations - The number of terms to sum in the series.
 * @returns An approximation of Pi.
 */
export function calculatePiNilakantha(iterations: number): number {
  if (iterations < 0) return 0;
  let pi = 3;
  let sign = 1;
  for (let i = 1; i <= iterations; i++) {
    const n = 2 * i;
    const term = 4 / (n * (n + 1) * (n + 2));
    pi += sign * term;
    sign = -sign;
  }
  return pi;
}

/**
 * Helper to compute arctan(1/x) using BigInt with a specified scaling factor (unity).
 */
function arccot(x: bigint, unity: bigint): bigint {
  let sum = unity / x;
  let x2 = x * x;
  let term = sum;
  let n = 1n;
  while (true) {
    term = term / x2;
    const nextTerm = term / (2n * n + 1n);
    if (nextTerm === 0n) break;
    if (n % 2n === 1n) {
      sum -= nextTerm;
    } else {
      sum += nextTerm;
    }
    n++;
  }
  return sum;
}

/**
 * Calculates Pi to a specified number of decimal digits using Machin's formula.
 * This utilizes BigInt to avoid float precision limits.
 *
 * @param digits - The number of decimal digits of Pi to calculate (excluding the leading "3.").
 * @returns A string representation of Pi (e.g. "3.14159...").
 */
export function calculatePiSpigot(digits: number): string {
  if (digits <= 0) return "3";

  // Add extra guard digits to avoid rounding errors at the end
  const guardDigits = 10;
  const unity = 10n ** BigInt(digits + guardDigits);

  // Machin's Formula: pi = 4 * (4 * arctan(1/5) - arctan(1/239))
  const pi = 4n * (4n * arccot(5n, unity) - arccot(239n, unity));

  // Scale back down, removing guard digits
  const piStr = (pi / (10n ** BigInt(guardDigits))).toString();

  // Format as 3.xxxxxx
  return piStr[0] + "." + piStr.slice(1, digits + 1);
}
