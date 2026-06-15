/**
 * PI Calculation Challenge
 * 
 * Approach: Leibniz formula for Pi (Gregory-Leibniz series)
 * 
 * The formula states that:
 * 1 - 1/3 + 1/5 - 1/7 + 1/9 - ... = PI / 4
 * 
 * Therefore:
 * PI = 4 * (1 - 1/3 + 1/5 - 1/7 + 1/9 - ...)
 * 
 * This is a lightweight algorithm challenge demonstrating iterative mathematical 
 * approximation. While not the fastest converging series, it is one of the 
 * simplest and most elegant approaches to calculating PI iteratively.
 */

export function calculatePi(iterations: number): number {
  let pi = 0;
  let divisor = 1;
  let isPositive = true;

  for (let i = 0; i < iterations; i++) {
    if (isPositive) {
      pi += 4 / divisor;
    } else {
      pi -= 4 / divisor;
    }
    
    // Toggle sign for next term
    isPositive = !isPositive;
    
    // Move to next odd number
    divisor += 2;
  }

  return pi;
}

// Example usage:
// console.log(`PI (1,000 iterations): ${calculatePi(1000)}`);
// console.log(`PI (10,000,000 iterations): ${calculatePi(10000000)}`);
// console.log(`Math.PI reference: ${Math.PI}`);
