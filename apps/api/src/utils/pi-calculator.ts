/**
 * PI Calculator using Monte Carlo Method
 * 
 * This module provides a simple implementation to approximate the value of PI
 * using the Monte Carlo method. It's for demonstration purposes only.
 */

/**
 * Calculates an approximation of PI using the Monte Carlo method
 * @param {number} iterations - Number of random points to generate
 * @returns {number} - Approximated value of PI
 */
export function calculatePI(iterations: number = 1000000): number {
  let insideCircle = 0;

  for (let i = 0; i < iterations; i++) {
    const x = Math.random();
    const y = Math.random();
    
    if (x * x + y * y <= 1) {
      insideCircle++;
    }
  }

  return 4 * insideCircle / iterations;
}

// Example usage:
// const pi = calculatePI(1000000);
// console.log(`Estimated PI: ${pi}`);

/**
 * The Monte Carlo method is a statistical approach that uses random sampling.
 * It's lightweight and demonstrates algorithmic thinking without requiring 
 * heavy computational resources.
 */