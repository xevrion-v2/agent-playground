/**
 * Ensures a value is an array; wraps non-arrays in a single-element array.
 * @module utils/ensure-array
 */
export function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
