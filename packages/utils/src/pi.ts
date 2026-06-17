/**
 * Calculate PI using the Leibniz / Gregory series.
 * PI/4 = 1 - 1/3 + 1/5 - 1/7 + 1/9 - ...
 * Converges to approximately n digits with 10^n terms.
 */
export function calculatePi(iterations: number): number {
  let pi = 0;
  for (let i = 0; i < iterations; i++) {
    pi += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return pi * 4;
}

export function calculatePiToNDigits(digits: number): string {
  const iterations = Math.pow(10, digits + 1);
  const pi = calculatePi(iterations);
  return pi.toFixed(Math.min(digits, 100));
}
