/**
 * Formats a number as a percentage.
 * @param value - The number to format.
 * @param decimals - The number of decimal places (default: 0).
 * @param fallback - The fallback value if formatting fails (default: '0%').
 * @returns The formatted percentage string.
 */
export function toPercentage(value: unknown, decimals: number = 0, fallback: string = '0%'): string {
  if (typeof value !== 'number' || !isFinite(value)) {
    return fallback;
  }

  const percentage = value * 100;
  const formatted = percentage.toFixed(decimals);
  return `${formatted}%`;
}