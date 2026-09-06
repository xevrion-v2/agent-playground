/**
 * Type guard that checks whether a value is an Error instance.
 * Useful for narrowing `unknown` caught values in try/catch blocks.
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}
