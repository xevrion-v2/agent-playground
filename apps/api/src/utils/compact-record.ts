/**
 * Removes all keys with undefined or null values from an object.
 * @param obj - The object to compact.
 * @returns A new object with undefined/null values removed.
 *
 * @example
 * ```ts
 * compactRecord({ a: 1, b: undefined, c: 3 }); // => { a: 1, c: 3 }
 * ```
 */
export function compactRecord<T extends Record<string, any>>(obj: T): T {
  const result = {} as T;
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      (result as any)[key] = value;
    }
  }
  return result;
}
