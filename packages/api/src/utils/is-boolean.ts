/**
 * Checks if a value is a boolean.
 * @param value - The value to check.
 * @returns True if the value is a boolean, false otherwise.
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}