/**
 * Returns a shallow object copy without keys whose values are undefined.
 * @param obj - The object to filter.
 * @returns New object with undefined values removed.
 */
export function omitUndefined<T extends Record<string, unknown>>(obj: T): { [K in keyof T as T[K] extends undefined ? never : K]: T[K] } {
  const result = {} as { [K in keyof T as T[K] extends undefined ? never : K]: T[K] };
  for (const key in obj) {
    if (obj[key as keyof T] !== undefined) {
      result[key as keyof typeof result] = obj[key as keyof T];
    }
  }
  return result;
}