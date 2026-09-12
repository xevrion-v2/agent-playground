/**
 * Calculates the value of PI using the Leibniz formula for π
 * 
 * The Leibniz formula is an infinite series that converges to π:
 * π = 4/1 - 4/3 + 4/5 - 4/7 + 4/9 - 4/11 + 4/13 - ...
 * 
 * @param iterations - Number of iterations to use in the series (higher = more accurate)
 * @returns The calculated value of PI
 */
export function calculatePI(iterations: number = 10000000): number {
  let pi = 0;
  let denominator = 1;
  
  for (let i = 0; i < iterations; i++) {
    if (i % 2 === 0) {
      pi += 4 / denominator;
    } else {
      pi -= 4 / denominator;
    }
    denominator += 2;
  }
  return pi;
}