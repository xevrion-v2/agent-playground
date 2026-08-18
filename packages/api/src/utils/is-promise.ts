/**
 * Checks if a value is a Promise.
 * @param value - The value to check.
 * @returns True if the value is a Promise, false otherwise.
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return value instanceof Promise;
}