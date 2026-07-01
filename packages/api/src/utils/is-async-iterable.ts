/**
 * Checks if a value is async iterable.
 * @param value - The value to check.
 * @returns True if the value is async iterable, false otherwise.
 */
export function isAsyncIterable(value: unknown): value is AsyncIterable<unknown> {
  return typeof value === 'object' &&
    value !== null &&
    Symbol.asyncIterator in value &&
    typeof (value as AsyncIterable<unknown>)[Symbol.asyncIterator] === 'function';
}