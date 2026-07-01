/**
 * Groups a readonly array of items by a key derived from each item.
 *
 * @example
 * groupByKey(
 *   [{ type: "fruit", name: "apple" }, { type: "veg", name: "carrot" }, { type: "fruit", name: "banana" }],
 *   (item) => item.type
 * )
 * // => { fruit: [{...}, {...}], veg: [{...}] }
 */
export function groupByKey<
  T,
  K extends string | number | symbol,
>(
  items: readonly T[],
  keyFn: (item: T) => K,
): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of items) {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}
