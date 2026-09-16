/**
 * Splits a list into chunks of a given size.
 * @module utils/split-list
 */
export function splitList<T>(list: T[], size: number): T[][] {
  if (size <= 0) return [];
  return Array.from({ length: Math.ceil(list.length / size) }, (_, i) =>
    list.slice(i * size, i * size + size)
  );
}
