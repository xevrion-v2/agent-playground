/**
 * Calculates PI using the Monte Carlo method
 * @returns {number} - Approximation of PI
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
  
  return (insideCircle / iterations) * 4;
}

/**
 * Exports the function for external use
 */
export function approximatePi(iterations?: number): number {
  if (!iterations) {
    iterations = 1000000;
  }
  return calculatePI(iterations);
}

// For quick testing purposes
console.log('PI approximation:', approximatePi());