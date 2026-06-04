/**
 * Calculates the exact decimal digits of PI to the specified precision.
 * 
 * @param digits The number of decimal digits to calculate.
 * @returns A string representing PI with the requested precision (e.g. "3.14159...").
 */
export function calculatePi(digits: number): string {
  if (digits <= 0) {
    throw new Error("Precision must be a positive integer.");
  }
  
  let q = 1n;
  let r = 0n;
  let t = 1n;
  let k = 1n;
  let n = 3n;
  let l = 3n;
  
  const result: bigint[] = [];
  
  while (result.length < digits) {
    if (4n * q + r - t < n * t) {
      result.push(n);
      const next_q = 10n * q;
      const next_r = 10n * (r - n * t);
      const next_n = (10n * (3n * q + r)) / t - 10n * n;
      q = next_q;
      r = next_r;
      n = next_n;
    } else {
      const next_q = q * k;
      const next_r = (2n * q + r) * l;
      const next_t = t * l;
      const next_n = (q * (7n * k + 2n) + r * l) / (t * l);
      q = next_q;
      r = next_r;
      t = next_t;
      k = k + 1n;
      n = next_n;
      l = l + 2n;
    }
  }
  
  if (result.length === 1) {
    return `${result[0]}`;
  }
  
  return `${result[0]}.${result.slice(1).join("")}`;
}
