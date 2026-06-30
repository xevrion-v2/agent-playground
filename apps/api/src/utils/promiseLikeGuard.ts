/**
 * A focused standalone API utility that acts as a promise-like guard.
 * It validates if a value is a valid Promise-like object (thenable)
 * and returns it, or throws an error if it is not.
 * 
 * No runtime dependencies.
 */

export interface PromiseLikeGuardResult<T> {
  isPromise: boolean;
  value: T | Promise<T>;
}

/**
 * Checks if a value is a valid Promise-like object.
 * If valid, returns the value. If not, throws a TypeError.
 * 
 * @param value - The value to check.
 * @returns The original value if it is promise-like.
 * @throws TypeError if the value is not promise-like.
 */
export function promiseLikeGuard<T>(value: T | PromiseLike<T>): PromiseLike<T> {
  if (value === null || value === undefined) {
    throw new TypeError('Value cannot be null or undefined');
  }

  if (typeof value === 'object' || typeof value === 'function') {
    if ('then' in value && typeof (value as any).then === 'function') {
      return value as PromiseLike<T>;
    }
  }

  throw new TypeError(`Value is not promise-like: ${typeof value}`);
}

/**
 * Alternative export name to strictly match the issue description's 
 * placeholder if interpreted as a specific named export requirement,
 * though 'promiseLikeGuard' is the functional name.
 * 
 * The issue mentions: $(System.Collections.Specialized.OrderedDictionary.export)()
 * Since that is a .NET reference, we map the concept to the JS equivalent:
 * A guard that ensures a value is a Promise.
 */
export const OrderedDictionaryExport = promiseLikeGuard;