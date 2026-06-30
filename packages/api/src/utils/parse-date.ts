/**
 * Safely parses a date from unknown input values.
 * Supports Date objects, ISO strings, timestamps (number), and already-parsed Date instances.
 * Returns null for invalid, undefined, or unparseable inputs — no thrown exceptions.
 */
export function parseDate(value: unknown): Date | null {
  if (value === null || value === undefined) return null;

  if (value instanceof Date) {
    return isNaN(value.getTime()) ? null : value;
  }

  if (typeof value === "number") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const d = new Date(trimmed);
    return isNaN(d.getTime()) ? null : d;
  }

  return null;
}
