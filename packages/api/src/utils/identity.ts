/**
 * A utility function that returns the input value unchanged.
 * Useful as a default transformer or placeholder.
 * @param value - The input value.
 * @returns The same value.
 */
export function identity<T>(value: T): T {
  return value;
}