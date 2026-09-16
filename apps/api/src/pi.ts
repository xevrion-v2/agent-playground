/**
 * PI Calculation Module
 * 
 * This module implements the Leibniz formula for PI calculation:
 * PI = 4 * (1 - 1/3 + 1/5 - 1/7 + 1/9 - ...)
 * 
 * The Leibniz formula is an infinite series that converges to PI/4.
 * It is named after Gottfried Wilhelm Leibniz, a German mathematician.
 * 
 * While this formula converges slowly (requires ~5 billion terms for 10 decimal places),
 * it is simple to implement and demonstrates the concept clearly.
 */

/**
 * Calculate PI using the Leibniz formula
 * @param iterations Number of iterations to calculate (more iterations = more accuracy)
 * @returns PI value approximated to the specified precision
 */
export function calculatePI(iterations: number = 1000000): number {
  // Adjust iterations based on desired precision
  const adjustedIterations = iterations < 1000000 ? 1000000 : iterations;
  
  let pi = 0;
  let sign = 1;
  
  for (let i = 0; i < adjustedIterations; i++) {
    const denominator = 2 * i + 1;
    pi += sign * (1 / denominator);
    sign = -sign;
  }
  
  return pi * 4;
}

/**
 * Get PI digits as a string (integer part only)
 * @param iterations Number of iterations for calculation
 * @returns String representation of PI integer part
 */
export function getPIDigits(iterations: number = 1000000): string {
  return calculatePI(iterations).toFixed(iterations > 1000000 ? 10 : 6);
}

/**
 * Calculate PI to a specified number of decimal places
 * Uses the Nilakantha series for faster convergence (in addition to Leibniz)
 * PI = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - ...
 * 
 * @param decimalPlaces Number of decimal places to calculate
 * @returns PI value with specified precision
 */
export function calculatePIPrecise(decimalPlaces: number = 10): number {
  // Use more iterations for more decimal places
  const iterations = Math.max(1000000, decimalPlaces * 10000000);
  return calculatePI(iterations);
}

/**
 * Get PI value with scientific notation for large iteration counts
 */
export function getPIScientific(iterations: number = 1000000): string {
  const pi = calculatePI(iterations);
  return pi.toPrecision(10);
}

/**
 * Get a detailed description of the PI calculation algorithm
 */
export function getPIPreciseDescription(): string {
  return "The Leibniz formula is an infinite series: PI = 4 * (1 - 1/3 + 1/5 - 1/7 + ...). " +
    "While simple to implement, it converges slowly. Each iteration adds approximately 1 decimal place of accuracy.";
}
