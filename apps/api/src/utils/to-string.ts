/**
 * Converts an unknown value to a string with a fallback.
 * @param value - The value to convert.
 * @param fallback - The fallback value if conversion fails (default: '').
 * @returns A string.
 */
export function toString(value: unknown, fallback: string = ''): string {
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