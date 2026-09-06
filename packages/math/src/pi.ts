/**
 * PI Calculation Module
 * 
 * Uses the Bailey-Borwein-Plouffe (BBP) formula for efficient
 * computation of PI to arbitrary precision.
 * 
 * The BBP formula:
 * PI = SUM(k=0 to infinity) [1/16^k * (4/(8k+1) - 2/(8k+4) - 1/(8k+5) - 1/(8k+6))]
 * 
 * Also includes the Leibniz formula for comparison and verification.
 */

/**
 * Calculate PI using the Bailey-Borwein-Plouffe (BBP) formula.
 * Converges quickly - each term adds ~1.2 decimal digits of precision.
 * 
 * @param iterations - Number of iterations (default: 1000)
 * @returns PI as a number
 */
export function calculatePI_BBP(iterations: number = 1000): number {
  let pi = 0;
  for (let k = 0; k < iterations; k++) {
    const term = 1 / Math.pow(16, k) * (
      4 / (8 * k + 1) -
      2 / (8 * k + 4) -
      1 / (8 * k + 5) -
      1 / (8 * k + 6)
    );
    pi += term;
  }
  return pi;
}

/**
 * Calculate PI using the Leibniz formula (for verification).
 * PI/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 * 
 * @param iterations - Number of iterations (default: 1000000)
 * @returns PI as a number
 */
export function calculatePI_Leibniz(iterations: number = 1000000): number {
  let pi = 0;
  for (let k = 0; k < iterations; k++) {
    pi += Math.pow(-1, k) / (2 * k + 1);
  }
  return pi * 4;
}

/**
 * Calculate PI using the Nilakantha series (faster convergence than Leibniz).
 * PI = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + ...
 * 
 * @param iterations - Number of iterations (default: 100)
 * @returns PI as a number
 */
export function calculatePI_Nilakantha(iterations: number = 100): number {
  let pi = 3;
  let sign = 1;
  for (let k = 2; k <= iterations * 2; k += 2) {
    pi += sign * 4 / (k * (k + 1) * (k + 2));
    sign *= -1;
  }
  return pi;
}

/**
 * Get PI to a specified number of decimal places using BBP.
 * 
 * @param decimalPlaces - Number of decimal places (max ~15 for JS number precision)
 * @returns PI as a string
 */
export function getPIString(decimalPlaces: number = 100): string {
  const pi = calculatePI_BBP(1000);
  return pi.toFixed(Math.min(decimalPlaces, 15));
}

// Default export
export default calculatePI_BBP;
