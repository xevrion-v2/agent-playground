/**
 * Calculate PI using the Leibniz series: PI/4 = 1 - 1/3 + 1/5 - 1/7 + ...
 * Converges slowly but demonstrates the approach clearly.
 *
 * For production use Math.PI; this is an educational implementation.
 */
export function calculatePI(iterations: number = 1000000): number {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    pi += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return pi * 4;
}

// Example usage
console.log("PI (Leibniz, 1M iterations):", calculatePI());
console.log("Math.PI reference:          ", Math.PI);