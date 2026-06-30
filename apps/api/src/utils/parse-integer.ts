/**
 * Safely parses an integer from unknown input.
 * Returns null for values that cannot be parsed as integers.
 */
export function parseInteger(value: unknown): number | null {
  if (value === null || value === undefined) return null;

  if (typeof value === "number") {
    if (!Number.isFinite(value)) return null;
    const int = Math.trunc(value);
    return Object.is(int, -0) ? 0 : int;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const num = Number(trimmed);
    if (!Number.isFinite(num)) return null;
    const int = Math.trunc(num);
    return Object.is(int, -0) ? 0 : int;
  }

  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }

  return null;
}
