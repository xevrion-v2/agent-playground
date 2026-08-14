export function countBy<T, K extends PropertyKey>(items: readonly T[], selector: (item: T) => K): Record<K, number> {
  const counts = {} as Record<K, number>;

  for (const item of items) {
    const key = selector(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }

  return counts;
}