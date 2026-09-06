/**
 * Calculates an approximation of PI using the Leibniz formula.
 *
 * @param terms Number of terms in the series (more = better accuracy)
 * @returns Approximation of PI
 */
export function calculatePi(terms: number = 100000): number {
  if (terms < 1) throw new Error("Terms must be at least 1");
  let pi = 0;
  let sign = 1;
  for (let i = 0; i < terms; i++) {
    pi += sign / (2 * i + 1);
    sign *= -1;
  }
  return pi * 4;
}

/**
 * Calculates PI using the Nilakantha series (faster convergence).
 */
export function calculatePiFast(terms: number = 10000): number {
  if (terms < 1) throw new Error("Terms must be at least 1");
  let pi = 3;
  let sign = 1;
  for (let i = 0; i < terms; i++) {
    const n = 2 * (i + 1);
    pi += sign * (4 / (n * (n + 1) * (n + 2)));
    sign *= -1;
  }
  return pi;
}
