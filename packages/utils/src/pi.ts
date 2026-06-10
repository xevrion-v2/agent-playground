/**
 * Compute the value of PI using the Chudnovsky algorithm.
 * 
 * The Chudnovsky algorithm converges at ~14 digits per iteration,
 * making it one of the fastest known methods for computing PI.
 *
 * @module pi
 */

/**
 * Compute PI to a specified number of decimal places using the Chudnovsky algorithm.
 *
 * @param decimalPlaces - Number of decimal places to compute (default: 100)
 * @returns PI as a string with the specified precision
 *
 * @example
 * ```ts
 * import { computePi } from './pi';
 * console.log(computePi(10)); // "3.1415926535"
 * ```
 */
export function computePi(decimalPlaces: number = 100): string {
  // Use the Chudnovsky algorithm with BigInt for arbitrary precision
  // 1/π = 12 * Σ_{k=0}^{∞} ((-1)^k * (6k)! * (A + B*k)) / ((3k)! * (k!)^3 * C^(3k+3/2))
  // where A = 13591409, B = 545140134, C = 640320
  
  const A = 13591409n;
  const B = 545140134n;
  const C = 640320n;
  const C3_OVER_24 = (C * C * C) / 24n;
  
  const iterations = Math.ceil(decimalPlaces / 14) + 1;
  
  let sum = 0n;
  let factorial6k = 1n; // (6k)!
  let factorial3k = 1n; // (3k)!
  let factorialK3 = 1n; // (k!)^3
  let cPower = 1n;      // C^(3k+3/2) represented as C^(3k) * C^(3/2)
  let sign = 1n;        // (-1)^k
  
  for (let k = 0; k < iterations; k++) {
    if (k === 0) {
      // Initial values: 0! = 1
      sum = A;
    } else {
      // Update factorials incrementally
      // (6k)! from (6(k-1))!:
      const k6 = BigInt(6 * k);
      factorial6k = factorial6k
        * (k6 - 5n) * (k6 - 4n) * (k6 - 3n)
        * (k6 - 2n) * (k6 - 1n) * k6;
      
      // (3k)! from (3(k-1))!:
      const k3 = BigInt(3 * k);
      factorial3k = factorial3k * (k3 - 2n) * (k3 - 1n) * k3;
      
      // (k!)^3:
      const kBn = BigInt(k);
      factorialK3 = factorialK3 * kBn * kBn * kBn;
      
      // C^(3k):
      cPower = cPower * C3_OVER_24 * 24n;
      
      // Numerator: (-1)^k * (6k)! * (A + B*k)
      const numerator = sign * factorial6k * (A + B * BigInt(k));
      
      // Denominator: (3k)! * (k!)^3 * C^(3k)
      const denominator = factorial3k * factorialK3;
      
      sum += (numerator * 10n ** BigInt(decimalPlaces + 10)) / denominator;
    }
    
    sign = -sign;
  }
  
  // PI = C^(3/2) / (12 * sum)
  // C^(3/2) = C * sqrt(C) = 640320 * sqrt(640320)
  // We compute this using integer arithmetic with scaling
  const C_SQRT_C = C * isqrt(C * 10n ** BigInt(2 * (decimalPlaces + 10)));
  const pi = (C_SQRT_C * 10n ** BigInt(decimalPlaces + 10)) / (12n * sum);
  
  // Convert to string
  const piStr = pi.toString();
  
  // Format as "3.14159..."
  if (piStr.length <= decimalPlaces) {
    return '3.' + piStr.padStart(decimalPlaces, '0');
  }
  return piStr[0] + '.' + piStr.slice(1, decimalPlaces + 1);
}

/**
 * Integer square root using Newton's method.
 */
function isqrt(n: bigint): bigint {
  if (n < 0n) throw new RangeError('Square root of negative number');
  if (n === 0n) return 0n;
  
  let x = n;
  let y = (x + 1n) / 2n;
  while (y < x) {
    x = y;
    y = (x + n / x) / 2n;
  }
  return x;
}

/**
 * Get PI to a specified number of decimal places.
 * This is a convenience wrapper around computePi().
 *
 * @param decimalPlaces - Number of decimal places (default: 100)
 * @returns PI as a string
 *
 * @example
 * ```ts
 * import { piToDecimalPlaces } from './pi';
 * console.log(piToDecimalPlaces(5)); // "3.14159"
 * ```
 */
export function piToDecimalPlaces(decimalPlaces: number = 100): string {
  return computePi(decimalPlaces);
}

/**
 * Generator that yields successive approximations of PI.
 * Each iteration of the Chudnovsky algorithm produces ~14 more digits.
 *
 * @param maxIterations - Maximum number of iterations (default: 10)
 * @yields Current approximation of PI as a string
 *
 * @example
 * ```ts
 * import { piApproximations } from './pi';
 * for (const approx of piApproximations(5)) {
 *   console.log(approx);
 * }
 * ```
 */
export function* piApproximations(maxIterations: number = 10): Generator<string> {
  for (let i = 1; i <= maxIterations; i++) {
    const digits = i * 14;
    yield computePi(digits);
  }
}
