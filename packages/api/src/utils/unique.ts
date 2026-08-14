/**
 * Gets unique values from an array.
 * @param array - The array to get unique values from.
 * @returns An array of unique values.
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}