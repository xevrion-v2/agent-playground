/**
 * Picks only defined (non-null, non-undefined) values from an object.
 * @module utils/pick-defined
 */
export function pickDefined<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)
  ) as Partial<T>;
}
