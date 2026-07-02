/**
 * Returns the last element of a readonly array.
 * @param arr - The readonly array to get the last item from.
 * @returns The last element, or undefined if the array is empty.
 *
 * @example
 * ```ts
 * lastItem([1, 2, 3]); // => 3
 * lastItem([]); // => undefined
 * lastItem(["a"]); // => "a"
 * ```
 */
export function lastItem<T>(arr: readonly T[]): T | undefined {
  return arr.length > 0 ? arr[arr.length - 1] : undefined;
}
