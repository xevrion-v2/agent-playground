/**
 * Calculates an approximation of PI using the Leibniz formula for PI.
 * This is a lightweight math/algorithm challenge implementation.
 * 
 * The Leibniz formula is:
 * PI = 4/1 - 4/3 + 4/5 - 4/7 + 4/9 - ...
 * 
 * @param iterations The number of iterations to perform. Higher iterations yield better accuracy.
 * @returns The approximated value of PI.
 */
export function calculatePi(iterations: number): number {
  let pi = 0;
  let divisor = 1;
  let sign = 1;

  for (let i = 0; i < iterations; i++) {
    pi += sign * (4 / divisor);
    divisor += 2;
    sign *= -1;
  }

  return pi;
}
