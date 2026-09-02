/**
 * Calculates PI using Kahan-summated Leibniz series for improved accuracy.
 * 
 * @param iterations - Number of series terms (higher = more accurate)
 * @returns Approximation of PI
 */
export function calculatePI(iterations: number = 1_000_000): number {
  let sum = 0;
  let compensation = 0;
  
  for (let i = 0; i < iterations; i++) {
    const term = (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
    const y = term - compensation;
    const t = sum + y;
    compensation = (t - sum) - y;
    sum = t;
  }
  
  return sum * 4;
}

export function getReferencePI(): number {
  return Math.PI;
}

export function getPIError(calculated: number): number {
  return Math.abs(calculated - getReferencePI());
}
