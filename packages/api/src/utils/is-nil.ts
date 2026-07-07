/**
 * Checks if a value is nil (null or undefined).
 * @param value - The value to check.
 * @returns True if the value is nil, false otherwise.
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}