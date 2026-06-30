type CountKey = string | number | symbol;

export function countBy<T, K extends keyof T>(
  items: readonly T[],
  key: K
): Record<Extract<T[K], CountKey>, number>;
export function countBy<T, K extends CountKey>(
  items: readonly T[],
  selector: (item: T) => K
): Record<K, number>;
export function countBy<T>(
  items: readonly T[],
  selectorOrKey: keyof T | ((item: T) => CountKey)
): Record<CountKey, number> {
  const counts = Object.create(null) as Record<CountKey, number>;

  for (const item of items) {
    const key =
      typeof selectorOrKey === "function"
        ? selectorOrKey(item)
        : (item[selectorOrKey] as CountKey);

    counts[key] = (counts[key] ?? 0) + 1;
  }

  return counts;
}
