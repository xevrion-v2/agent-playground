/**
 * Safely parses a date from an unknown value.
 * @param value - The value to parse.
 * @param fallback - The fallback date if parsing fails (default: new Date(0)).
 * @returns The parsed date or fallback.
 */
export function parseDate(value: unknown, fallback: Date = new Date(0)): Date {
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? fallback : value;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? fallback : date;
  }

  return fallback;
}