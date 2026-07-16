/**
 * PI Calculator - Improves accuracy using the Leibniz formula.
 *
 * The Leibniz formula for PI:
 *   PI/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 *
 * @see https://en.wikipedia.org/wiki/Leibniz_formula_for_%CF%80
 */

/**
 * Calculate PI to a specified number of iterations using the Leibniz formula.
 * More iterations yield higher accuracy.
 *
 * @param iterations - Number of terms to sum (default: 1,000,000)
 * @returns Approximation of PI
 *
 * @example
 * ```typescript
 * const pi = calculatePi(1000000);
 * console.log(pi); // 3.1415916535897743
 * ```
 */
export function calculatePi(iterations: number = 1_000_000): number {
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    const term = 1 / (2 * i + 1);
    sum += i % 2 === 0 ? term : -term;
  }
  return sum * 4;
}

/**
 * Calculate PI and report the error compared to Math.PI.
 *
 * @param iterations - Number of terms to sum
 * @returns Object with calculated PI value and error margin
 *
 * @example
 * ```typescript
 * const result = calculatePiWithError(1000000);
 * console.log(result.pi);      // 3.1415916535897743
 * console.log(result.error);   // ~1.0e-6
 * ```
 */
export function calculatePiWithError(iterations: number = 1_000_000): {
  pi: number;
  error: number;
  iterations: number;
} {
  const pi = calculatePi(iterations);
  return {
    pi,
    error: Math.abs(Math.PI - pi),
    iterations
  };
}
