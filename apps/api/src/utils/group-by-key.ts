export function groupByKey<T, K extends PropertyKey>(
  values: readonly T[],
  selector: (value: T) => K,
): Record<K, T[]> {
  const groups: Partial<Record<K, T[]>> = {};

  for (const value of values) {
    const key = selector(value);
    const bucket = groups[key];
    if (bucket) {
      bucket.push(value);
    } else {
      groups[key] = [value];
    }
  }

  return groups as Record<K, T[]>;
}
