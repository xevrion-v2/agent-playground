/**
 * Returns the first element of a readonly array.
 * @param arr - The readonly array to get the first item from.
 * @returns The first element, or undefined if the array is empty.
 *
 * @example
 * ```ts
 * firstItem([1, 2, 3]); // => 1
 * firstItem([]); // => undefined
 * firstItem(["a"]); // => "a"
 * ```
 */
export function firstItem<T>(arr: readonly T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}
