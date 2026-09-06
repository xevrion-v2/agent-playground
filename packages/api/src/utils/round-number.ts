/**
 * Rounds a number to a specified precision.
 * @param value - The number to round.
 * @param precision - The number of decimal places (default: 0).
 * @param fallback - The fallback value if rounding fails (default: 0).
 * @returns The rounded number.
 */
export function roundNumber(value: unknown, precision: number = 0, fallback: number = 0): number {
  if (typeof value !== 'number' || !isFinite(value)) {
    return fallback;
  }

  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}