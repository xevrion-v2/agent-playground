/**
 * IsThenableHelper
 * 
 * A utility to check if a value is thenable (has a `then` method).
 * Useful for identifying Promises and Promise-like objects.
 * 
 * @param value - The value to check
 * @returns true if the value is thenable, false otherwise
 * 
 * @example
 * ```typescript
 * isThenable(Promise.resolve()) // true
 * isThenable({ then: () => {} }) // true
 * isThenable(null) // false
 * isThenable({}) // false
 * ```
 */
export function isThenable(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'object' || typeof value === 'function') {
    return typeof (value as any).then === 'function';
  }

  return false;
}

/**
 * Check if a value is a native Promise (not just thenable)
 */
export function isNativePromise(value: unknown): boolean {
  return value instanceof Promise;
}

/**
 * Check if a value is thenable and not a native Promise
 */
export function isThenableLike(value: unknown): boolean {
  return isThenable(value) && !isNativePromise(value);
}

/**
 * Safely get the resolved value from a thenable if possible
 */
export function extractFromThenable<T>(
  value: T | PromiseLike<T>
): T | PromiseLike<T> {
  if (isThenable(value)) {
    return value as PromiseLike<T>;
  }
  return value as T;
}
