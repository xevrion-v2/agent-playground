export function keyBy<T, K extends string | number>(
  values: readonly T[],
  selector: (value: T) => K,
): Record<K, T> {
  const result = {} as Record<K, T>;
  for (const value of values) {
    result[selector(value)] = value;
  }
  return result;
}
