/**
 * Checks if a value is an Error object.
 * @param value - The value to check.
 * @returns True if the value is an Error, false otherwise.
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}