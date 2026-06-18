/**
 * Calculate PI using the Leibniz series: pi/4 = 1 - 1/3 + 1/5 - 1/7 + ...
 * More iterations = more accurate result.
 */

export function calculatePi(iterations: number = 1000000): number {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    pi += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return pi * 4;
}

export function pi(): number {
  return calculatePi(1000000);
}
