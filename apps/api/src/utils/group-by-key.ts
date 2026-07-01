export function groupByKey<T, K extends PropertyKey>(
  values: readonly T[],
  selectKey: (value: T, index: number) => K,
): Partial<Record<K, T[]>> {
  const groups: Partial<Record<K, T[]>> = {};

  values.forEach((value, index) => {
    const key = selectKey(value, index);
    const group = groups[key] ?? [];

    group.push(value);
    groups[key] = group;
  });

  return groups;
}
