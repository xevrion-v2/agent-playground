/**
 * Calculates an approximation of PI using the Leibniz formula:
 *   PI/4 = 1 - 1/3 + 1/5 - 1/7 + ...
 *
 * More iterations = higher accuracy. 1,000,000 iterations gives
 * approximately 6 correct decimal places.
 *
 * @param iterations - Number of terms to sum (default 1_000_000)
 * @returns PI approximation
 */
export function calculatePI(iterations = 1_000_000): number {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    pi += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return pi * 4;
}

/**
 * Returns PI to `decimals` decimal places as a string.
 */
export function piToDecimalPlaces(decimals: number, iterations = 10_000_000): string {
  const pi = calculatePI(iterations);
  return pi.toFixed(decimals);
}

export default calculatePI;
