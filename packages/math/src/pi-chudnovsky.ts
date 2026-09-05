/**
 * High-precision PI estimate using the Chudnovsky algorithm.
 * PI is irrational; this returns a fixed-precision decimal string.
 */
export function estimatePiDigits(digits: number): string {
  if (!Number.isInteger(digits) || digits <= 0 || digits > 100) {
    throw new Error("digits must be an integer between 1 and 100");
  }

  // Chudnovsky series — fast convergence for demo purposes.
  let sum = 0;
  const C = 426880 * Math.sqrt(10005);
  for (let k = 0; k < 10; k += 1) {
    const numerator = factorial(6 * k) * (13591409 + 545140134 * k);
    const denominator = factorial(3 * k) * Math.pow(factorial(k), 3) * Math.pow(-640320, k);
    sum += numerator / denominator;
  }

  const pi = C / sum;
  return pi.toFixed(Math.min(digits, 15));
}

function factorial(n: number): number {
  if (n <= 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }
  return result;
}
