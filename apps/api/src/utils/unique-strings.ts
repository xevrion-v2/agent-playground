/**
 * Deduplicates a readonly string list preserving first-seen order.
 * @param arr - The string array to deduplicate.
 * @returns Array with unique strings in first-seen order.
 */
export function uniqueStrings(arr: readonly string[]): string[] {
  return [...new Set(arr)];
}