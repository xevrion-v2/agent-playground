/**
 * Checks if a value is an array.
 * @param value - The value to check.
 * @returns True if the value is an array, false otherwise.
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}