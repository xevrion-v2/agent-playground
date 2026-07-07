export function groupByKey<T, K extends PropertyKey>(
  values: readonly T[],
  keySelector: (value: T) => K,
): Record<K, T[]> {
  const grouped = Object.create(null) as Record<K, T[]>;

  for (const value of values) {
    const key = keySelector(value);
    if (grouped[key] === undefined) {
      grouped[key] = [];
    }

    grouped[key].push(value);
  }

  return grouped;
}
