export function groupBy<T>(
  values: readonly T[],
  keySelector: (value: T) => string,
): Record<string, T[]> {
  return values.reduce<Record<string, T[]>>((groups, value) => {
    const key = keySelector(value);
    groups[key] = groups[key] ?? [];
    groups[key].push(value);
    return groups;
  }, {});
}