/**
 * Checks if a value is defined (not null or undefined).
 * @param value - The value to check.
 * @returns True if the value is defined, false otherwise.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}