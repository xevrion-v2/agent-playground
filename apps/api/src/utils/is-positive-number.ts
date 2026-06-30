/**
 * Checks if a value is a positive number (> 0).
 * Returns false for zero, negative numbers, and non-numeric values.
 */
export function isPositiveNumber(value: unknown): boolean {
  if (value === null || value === undefined) return false;

  let num: number;
  if (typeof value === "number") {
    num = value;
  } else if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return false;
    num = Number(trimmed);
    if (!Number.isFinite(num)) return false;
  } else {
    return false;
  }

  return Number.isFinite(num) && num > 0;
}
