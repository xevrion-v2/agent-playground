/**
 * Calculate PI using the Leibniz series (Gregory-Leibniz).
 * π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 * Uses 1 million terms by default for ~5-6 decimal places.
 * For higher precision, the Machin-like formula is provided.
 *
 * @param terms Number of terms to sum (default: 1,000,000)
 * @returns PI approximation
 */
export function calculatePI(terms: number = 1_000_000): number {
  let sum = 0;
  for (let i = 0; i < terms; i++) {
    sum += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return 4 * sum;
}

/**
 * Calculate PI using Machin-like formula for faster convergence.
 * π/4 = 4·arctan(1/5) - arctan(1/239)
 * 10 iterations give ~10 decimal places.
 */
export function calculatePIMachin(iterations: number = 100): number {
  function arctan(x: number, n: number): number {
    let sum = 0;
    const x2 = x * x;
    let term = x;
    for (let i = 0; i < n; i++) {
      sum += term / (2 * i + 1);
      term *= -x2;
    }
    return sum;
  }
  return 4 * (4 * arctan(1 / 5, iterations) - arctan(1 / 239, iterations));
}

/** Reference PI value for comparison */
export const PI_REFERENCE = 3.14159265358979323846;
