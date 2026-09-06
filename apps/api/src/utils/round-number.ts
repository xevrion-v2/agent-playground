/**
 * Rounds a number to a specified number of decimal places.
 * @param value - The number to round.
 * @param decimals - Decimal places (default 0).
 * @returns Rounded number.
 *
 * @example
 * `	s
 * roundNumber(3.14159, 2); // => 3.14
 * roundNumber(42.5, 0); // => 43
 * `
 */
export function roundNumber(value: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
