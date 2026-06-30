/**
 * Safely parses an integer from an unknown value.
 * @param value - The value to parse.
 * @param fallback - The fallback value if parsing fails (default: 0).
 * @returns The parsed integer or fallback.
 */
export function parseInteger(value: unknown, fallback: number = 0): number {
  if (typeof value === 'number') {
    return Number.isInteger(value) ? value : fallback;
  }

  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? fallback : parsed;
  }

  return fallback;
}