/**
 * Safely reduces an unknown value to a log-friendly format.
 * @param value - The value to convert.
 * @param fallback - The fallback value if conversion fails (default: 'Unknown').
 * @returns A log-friendly string or the fallback.
 */
export function toLogValue(value: unknown, fallback: string = 'Unknown'): string {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return fallback;
    }
  }

  return fallback;
}