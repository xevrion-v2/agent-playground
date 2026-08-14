export function dedupeByKey<T, K extends PropertyKey>(
  values: readonly T[],
  selector: (value: T) => K,
): T[] {
  const seen = new Set<K>();
  const result: T[] = [];

  for (const value of values) {
    const key = selector(value);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  }

  return result;
}
