/**
 * Formats a number as a percentage string.
 * @param value - The numeric value to format.
 * @param decimals - Decimal places (default 0).
 * @returns Percentage string (e.g., "75%", "33.33%").
 *
 * @example
 * `	s
 * formatPercent(0.75); // => '75%'
 * formatPercent(1/3, 2); // => '33.33%'
 * `
 */
export function formatPercent(value: number, decimals: number = 0): string {
  return (value * 100).toFixed(decimals) + '%';
}
