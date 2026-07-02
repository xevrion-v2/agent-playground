/**
 * Calculate PI using the Leibniz formula
 * PI/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 * 
 * @param iterations - Number of iterations (higher = more accurate)
 * @returns Approximation of PI
 */
export function calculatePi(iterations: number = 1000000): number {
  let pi = 0;
  let sign = 1;
  
  for (let i = 0; i < iterations; i++) {
    pi += sign / (2 * i + 1);
    sign *= -1;
  }
  
  return pi * 4;
}

/**
 * Calculate PI using the Nilakantha series (faster convergence)
 * PI = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
 * 
 * @param iterations - Number of iterations
 * @returns Approximation of PI
 */
export function calculatePiNilakantha(iterations: number = 1000): number {
  let pi = 3;
  let sign = 1;
  
  for (let i = 1; i <= iterations; i++) {
    const denominator = (2 * i) * (2 * i + 1) * (2 * i + 2);
    pi += sign * (4 / denominator);
    sign *= -1;
  }
  
  return pi;
}
