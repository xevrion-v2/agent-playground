/**
 * Calculate PI using the Leibniz formula:
 * PI = 4 * (1 - 1/3 + 1/5 - 1/7 + 1/9 - ...)
 * This is a lightweight implementation that balances accuracy with performance.
 */
export function calculatePi(iterations: number = 1000000): number {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    // Using the Leibniz formula for π
    // π/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
    const denominator = 2 * i + 1;
    const term = Math.pow(-1, i) / denominator;
    pi += term;
  }
  
  // Since the series converges to π/4, we multiply by 4
  return 4 * pi;
}

export default calculatePi;