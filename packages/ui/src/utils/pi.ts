/**
 * PI Calculation Challenge (#14)
 *
 * Uses the Leibniz formula to approximate PI:
 * PI/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 *
 * The more iterations, the more accurate the result.
 */

/**
 * Approximates PI using the Leibniz series.
 * @param iterations - Number of terms to compute (default: 1,000,000)
 * @returns Approximation of PI
 */
export function calculatePI(iterations: number = 1_000_000): number {
  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    const sign = i % 2 === 0 ? 1 : -1;
    sum += sign / (2 * i + 1);
  }
  return sum * 4;
}

/**
 * Returns PI with a specified number of decimal places using Leibniz.
 * Note: Leibniz converges slowly; 10M iterations ≈ 7 decimal accuracy.
 */
export function piToDecimalPlaces(places: number): string {
  const pi = calculatePI(10_000_000);
  return pi.toFixed(places);
}
