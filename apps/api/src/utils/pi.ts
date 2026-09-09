/**
 * PI Calculation Utility
 *
 * Calculates PI using the Leibniz formula (Madhava-Leibniz series):
 *
 *   PI/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 *
 * This is a convergent infinite series discovered by Madhava of Sangamagrama
 * (c. 1350–1425) and independently by Gottfried Wilhelm Leibniz (1674).
 *
 * While not the fastest method for computing PI, it is simple, elegant,
 * and easy to understand. Each iteration adds one more term to improve
 * the approximation.
 *
 * Time complexity: O(n) where n is the number of iterations
 * Space complexity: O(1)
 */

/**
 * Calculates an approximation of PI using the Leibniz formula.
 *
 * @param iterations - Number of terms to sum (more = higher accuracy)
 * @returns Approximation of PI
 *
 * @example
 * ```ts
 * calculatePI(1000000); // => 3.1415916535897743
 * ```
 */
export function calculatePI(iterations: number = 1_000_000): number {
  if (iterations < 0) {
    throw new Error("Iterations must be a non-negative number");
  }

  let piOver4 = 0;

  for (let i = 0; i < iterations; i++) {
    const term = ((-1) ** i) / (2 * i + 1);
    piOver4 += term;
  }

  return piOver4 * 4;
}

/**
 * Calculates PI using the Bailey–Borwein–Plouffe (BBP) formula.
 *
 * This formula allows computing the nth hexadecimal digit of PI
 * without computing preceding digits:
 *
 *   PI = SUM(k=0..inf) [ 1/16^k * (4/(8k+1) - 2/(8k+4) - 1/(8k+5) - 1/(8k+6)) ]
 *
 * @param terms - Number of terms to sum
 * @returns Approximation of PI
 *
 * @example
 * ```ts
 * calculatePI_BBP(50); // => 3.14159265358979323846...
 * ```
 */
export function calculatePI_BBP(terms: number = 50): number {
  if (terms < 0) {
    throw new Error("Terms must be a non-negative number");
  }

  let pi = 0;

  for (let k = 0; k < terms; k++) {
    const pow16 = 16 ** k;
    pi += (1 / pow16) * (
      4 / (8 * k + 1) -
      2 / (8 * k + 4) -
      1 / (8 * k + 5) -
      1 / (8 * k + 6)
    );
  }

  return pi;
}
