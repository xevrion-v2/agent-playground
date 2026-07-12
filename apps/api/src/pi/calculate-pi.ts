/**
 * PI Calculator — Chudnovsky Algorithm
 *
 * Calculates PI to arbitrary decimal precision using the Chudnovsky formula:
 *
 *   1/π = 12 * Σ (-1)^k * (6k)! * (545140134k + 13591409)
 *                    / ((3k)! * (k!)^3 * 640320^(3k + 3/2))
 *
 * Uses BigInt for arbitrary-precision integer arithmetic.
 * Deterministic — always produces the same output for the same precision.
 *
 * Usage: node apps/api/src/pi/calculate-pi.cjs <digits>
 *   Default: 100 digits
 */

// Integer square root via Newton's method (BigInt)
function isqrt(n: bigint): bigint {
  if (n < 0n) throw new Error("Cannot compute sqrt of negative number");
  if (n < 2n) return n;

  let x = n;
  let y = (x + 1n) / 2n;
  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }
  return x;
}

// Factorial (BigInt)
function factorial(n: bigint): bigint {
  let result = 1n;
  for (let i = 2n; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Integer power (BigInt)
function power(base: bigint, exp: bigint): bigint {
  let result = 1n;
  let b = base;
  let e = exp;
  while (e > 0n) {
    if (e & 1n) result *= b;
    b *= b;
    e >>= 1n;
  }
  return result;
}

/**
 * Compute PI to `digits` decimal places using the Chudnovsky algorithm.
 * Returns a string like "3.14159265358979..."
 *
 * @param digits - Number of decimal places to compute (minimum 1)
 * @returns PI as a string with the specified number of decimal places
 */
export function calculatePi(digits: number): string {
  if (digits < 1) throw new Error("digits must be >= 1");

  const C = 426880n;
  const scale = power(100n, BigInt(digits)); // 10^(2*digits)

  // Chudnovsky constants
  const A = 13591409n;
  const B = 545140134n;
  const C3 = 640320n;

  // sqrt(640320) scaled to 10^digits
  const sqrtC3 = isqrt(C3 * C3 * scale * 100n) / 10n;

  let sum = 0n;
  // Each Chudnovsky term adds ~14 correct digits
  const terms = BigInt(Math.ceil(digits / 14) + 2);

  for (let k = 0n; k <= terms; k++) {
    const sign = k % 2n === 0n ? 1n : -1n;
    const f6k = factorial(6n * k);
    const f3k = factorial(3n * k);
    const fk = factorial(k);
    const fk3 = fk * fk * fk;
    const numerator = sign * f6k * (A + B * k);
    const denominator = f3k * fk3 * power(C3, 3n * k);
    sum += (numerator * scale) / denominator;
  }

  // PI = (C * scale * sqrtC3) / sum
  const pi = (C * scale * sqrtC3) / sum;

  // Convert to string with decimal point
  const piStr = pi.toString();
  if (piStr.length <= digits) {
    return "3." + piStr.padStart(digits, "0");
  }
  const intPart = piStr.slice(0, piStr.length - digits);
  const decPart = piStr.slice(piStr.length - digits);
  return `${intPart}.${decPart}`;
}
