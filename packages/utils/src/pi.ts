/**
 * Compute the value of PI using a fixed-point Machin-like formula.
 *
 * This implementation keeps the public API friendly:
 * - `computePi()` returns a JavaScript number for ergonomic day-to-day use
 * - `piToDecimalPlaces(n)` returns a high-precision decimal string
 *
 * @module pi
 */

const EXTRA_GUARD_DIGITS = 10;

function arctanInverse(denominator: bigint, scale: bigint): bigint {
  const denominatorSquared = denominator * denominator;
  let term = scale / denominator;
  let sum = 0n;
  let divisor = 1n;
  let sign = 1n;

  while (term > 0n) {
    sum += sign * (term / divisor);
    term /= denominatorSquared;
    divisor += 2n;
    sign = -sign;
  }

  return sum;
}

function computePiDigits(decimalPlaces: number): string {
  if (!Number.isInteger(decimalPlaces) || decimalPlaces < 0) {
    throw new RangeError("decimalPlaces must be a non-negative integer");
  }

  const scaleDigits = decimalPlaces + EXTRA_GUARD_DIGITS;
  const scale = 10n ** BigInt(scaleDigits);
  const piScaled =
    16n * arctanInverse(5n, scale) -
    4n * arctanInverse(239n, scale);

  const rounded = (piScaled + 5n * 10n ** BigInt(EXTRA_GUARD_DIGITS - 1)) /
    (10n ** BigInt(EXTRA_GUARD_DIGITS));
  const piString = rounded.toString().padStart(decimalPlaces + 1, "0");

  if (decimalPlaces === 0) {
    return `${piString[0]}.`;
  }

  return `${piString[0]}.${piString.slice(1, decimalPlaces + 1)}`;
}

/**
 * Compute PI as a JavaScript number.
 *
 * This is useful for code that wants standard floating-point behaviour while
 * still sharing the same underlying implementation as the arbitrary-precision
 * helpers in this module.
 */
export function computePi(): number {
  return Number(computePiDigits(15));
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
  return computePiDigits(decimalPlaces);
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
    yield computePiDigits(digits);
  }
}
