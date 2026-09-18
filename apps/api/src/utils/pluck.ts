export function pluck<TItem, TKey extends keyof TItem>(
  items: readonly TItem[],
  key: TKey
): TItem[TKey][] {
  return items.map((item) => item[key]);
}
