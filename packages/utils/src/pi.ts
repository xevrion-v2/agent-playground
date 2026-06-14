/**
 * PI Calculator - Leibniz Formula
 * 
 * Uses the Leibniz formula for π:
 * π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 * 
 * This converges slowly but is simple to implement.
 */

export function calculatePi(iterations: number = 1000000): number {
  let pi = 0;
  let sign = 1;

  for (let i = 0; i < iterations; i++) {
    const denominator = 2 * i + 1;
    pi += sign / denominator;
    sign *= -1;
  }

  return pi * 4;
}

export function calculatePiError(iterations: number = 1000000): {
  calculated: number;
  error: number;
  iterations: number;
} {
  const calculated = calculatePi(iterations);
  const actual = Math.PI;
  const error = Math.abs(calculated - actual);

  return {
    calculated,
    error,
    iterations,
  };
}
