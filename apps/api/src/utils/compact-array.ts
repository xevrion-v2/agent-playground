/**
 * Removes nullish (null/undefined) entries from a readonly array.
 * @param arr - The readonly array to compact.
 * @returns New array with nullish values removed.
 */
export function compactArray<T>(arr: readonly (T | null | undefined)[]): T[] {
  return arr.filter((v): v is T => v !== null && v !== undefined);
}