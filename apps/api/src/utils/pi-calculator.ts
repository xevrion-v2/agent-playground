/**
 * Calculates an approximation of PI using the Leibniz formula for π:
 * π = 4/1 - 4/3 + 4/5 - 4/7 + 4/9 - 4/11 + 4/13 ...
 *
 * @param iterations The number of iterations to use in the calculation (higher = more accurate)
 * @returns The calculated value of PI
 */
export function calculatePI(iterations: number = 10000000): number {
  let pi = 0;
  let sign = 1;
  for (let i = 0; i < iterations; i++) {
    pi += sign / (2 * i + 1);
    sign *= -1;
  }
  return pi * 4;
}

/**
 * Calculates an approximation of PI using the Chudnovsky algorithm, which is more efficient
 * and accurate than the Leibniz formula.
 *
 * @param iterations The number of iterations to use in the calculation (higher = more accurate)
 * @returns The calculated value of PI
 */
export function calculatePIChudnovsky(iterations: number = 2): number {
  // The Chudnovsky algorithm is more complex and uses factorials and high precision arithmetic
  // For simplicity in this example, we'll use a basic series approximation
  // In a production environment, a more accurate implementation would be needed
  let sum = 0;
  for (let k = 0; k < iterations; k++) {
    const numerator = factorial(6 * k) * (545140134 * k + 13591409);
    const denominator = factorial(3 * k) * (factorial(k) ** 3) * (640320 ** (3 * k));
    sum += ((-1) ** k) * (numerator / denominator);
  }
  return 1 / (12 * sum);
}

function factorial(n: number): number {
  return n <= 1 ? 1 : n * factorial(n - 1);
}