/**
 * Arbitrary-precision PI calculation using Machin-like formula.
 *
 * ## Algorithm
 *
 * Uses Machin's formula:
 * ```
 * π/4 = 4·arctan(1/5) - arctan(1/239)
 * ```
 *
 * where arctan(x) is computed via the Taylor series:
 * ```
 * arctan(x) = x - x³/3 + x⁵/5 - x⁷/7 + ...
 * ```
 *
 * This converges linearly (~0.5 digits per term) but is simple to
 * implement correctly with BigInt for arbitrary precision.
 *
 * ## Usage
 *
 * ```ts
 * const pi = calculatePi(50);   // 50 decimal places
 * console.log(pi);
 * // "3.14159265358979323846264338327950288419716939937510"
 * ```
 *
 * ## References
 * - Machin, J. (1706). "Computation of π to 100 decimal places".
 * - https://en.wikipedia.org/wiki/Machin-like_formula
 */

/**
 * Compute arctan(1/x) using the Taylor series with BigInt arithmetic.
 *
 * @param x    - The denominator (e.g., 5 for arctan(1/5)).
 * @param precision - Number of decimal places of internal precision.
 * @returns arctan(1/x) scaled by 10^precision, as a BigInt.
 */
function arctan1OverX(x: bigint, precision: number): bigint {
  const precisionBig = BigInt(precision);
  const scale = 10n ** (precisionBig + 2n); // 2 guard digits
  const xSquared = x * x;

  let sum = scale / x;
  let term = sum;
  let n = 1n;

  // Continue until the term becomes negligible
  while (term > 0n) {
    n += 2n;
    term = term / xSquared; // equivalent to dividing by x^2
    const divisor = n;
    const nextTerm = term / divisor;
    if (nextTerm === 0n) break;

    if (n % 4n === 3n) {
      sum -= nextTerm;
    } else {
      sum += nextTerm;
    }
  }

  return sum;
}

/**
 * Calculate π to the specified number of decimal places.
 *
 * @param decimals - Number of decimal places (1 to 1000).
 * @returns A string representation of π.
 *
 * @example
 * ```ts
 * calculatePi(10)  // "3.1415926535"
 * calculatePi(100) // 100 digits
 * ```
 */
export function calculatePi(decimals: number): string {
  if (decimals < 1 || decimals > 1000) {
    throw new Error("decimals must be between 1 and 1000");
  }

  // Extra precision to compensate for rounding errors
  const precision = decimals + 4;

  // Machin's formula: π/4 = 4·arctan(1/5) - arctan(1/239)
  // π = 16·arctan(1/5) - 4·arctan(1/239)
  const arctan5 = arctan1OverX(5n, precision);
  const arctan239 = arctan1OverX(239n, precision);

  // π = 16 * arctan(1/5) - 4 * arctan(1/239)
  const piScaled = 16n * arctan5 - 4n * arctan239;

  // Scale back to the requested precision
  const scale = 10n ** BigInt(decimals);
  const result = (piScaled + 5n * 10n ** BigInt(precision - decimals - 1)) /
    (10n ** BigInt(precision - decimals));

  const resultStr = result.toString().padStart(decimals + 1, "0");
  const intPart = resultStr.slice(0, resultStr.length - decimals);
  const fracPart = resultStr.slice(resultStr.length - decimals);

  return `${intPart}.${fracPart}`;
}

/**
 * Verify computed PI digits against a known reference.
 *
 * @param computed - The computed PI string (e.g. "3.14159...").
 * @param reference - Known reference digits after "3.".
 * @returns The number of matching decimal places.
 */
export function verifyPiDigits(
  computed: string,
  reference: string,
): number {
  const parts = computed.split(".");
  if (parts.length !== 2) return 0;

  const compDigits = parts[1];
  let matches = 0;
  for (let i = 0; i < Math.min(compDigits.length, reference.length); i++) {
    if (compDigits[i] === reference[i]) {
      matches++;
    } else {
      break;
    }
  }
  return matches;
}
