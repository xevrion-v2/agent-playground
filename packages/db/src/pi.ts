/**
 * Approximate PI using the Bailey-Borwein-Plouffe (BBP) formula.
 *
 * The BBP formula computes the n-th hexadecimal digit of PI directly
 * without needing preceding digits, making it efficient for verification:
 *
 *   PI = Σ (1/16^k) * ( 4/(8k+1) - 2/(8k+4) - 1/(8k+5) - 1/(8k+6) )
 *
 * With 12 iterations, this achieves ~14 decimal digits of precision
 * (matching JavaScript's Number.EPSILON).
 *
 * @param iterations Number of summation terms (default 12)
 * @returns Approximation of PI
 */
export function calculatePI(iterations = 12): number {
  let pi = 0;
  for (let k = 0; k < iterations; k++) {
    const term =
      (4 / (8 * k + 1) - 2 / (8 * k + 4) - 1 / (8 * k + 5) - 1 / (8 * k + 6)) /
      Math.pow(16, k);
    pi += term;
  }
  return pi;
}
