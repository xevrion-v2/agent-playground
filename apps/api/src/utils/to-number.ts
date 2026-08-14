/**
 * Converts a value to a number. Returns NaN for non-numeric strings.
 * Accepts strings, numbers, and null/undefined (returns 0).
 */
export function toNumber(value: string | number | null | undefined): number {
  if (value === null || value === undefined) {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  const parsed = Number(value);
  return isNaN(parsed) ? 0 : parsed;
}
