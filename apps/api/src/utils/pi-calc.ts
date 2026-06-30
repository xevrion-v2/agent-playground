/**
 * Calculates PI using the Leibniz formula: π/4 = 1 - 1/3 + 1/5 - 1/7 + ...
 * Returns PI approximation with specified precision.
 */
export function calculatePi(iterations: number = 1000000): number {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    pi += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return pi * 4;
}
