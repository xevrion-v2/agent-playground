/**
 * Normalizes a single value, nullish value, or readonly array into a mutable array.
 * @param val - Value to normalize.
 * @returns Array containing the value(s).
 */
export function ensureArray<T>(val: T | readonly T[]): T[] {
  if (val === null || val === undefined) return [];
  return Array.isArray(val) ? [...val] : [val];
}