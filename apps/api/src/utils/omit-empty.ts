/**
 * Omits empty/null/undefined values from an object.
 * @module utils/omit-empty
 */
export function omitEmpty<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null && v !== "")
  ) as Partial<T>;
}
