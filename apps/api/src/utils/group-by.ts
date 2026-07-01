export function groupBy<T, K extends string | number>(
  values: T[],
  selector: (value: T) => K,
): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const value of values) {
    const key = selector(value);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(value);
  }
  return result;
}
