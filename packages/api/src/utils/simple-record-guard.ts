/**
 * Safely reduces an unknown value to a simple record object.
 * @param value - The value to convert.
 * @param fallback - The fallback record if conversion fails (default: {}).
 * @returns A simple record object or the fallback.
 */
export function toRecord(
  value: unknown,
  fallback: Record<string, unknown> = {}
): Record<string, unknown> {
  if (value === null || value === undefined) {
    return fallback;
  }

  if (typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return fallback;
}