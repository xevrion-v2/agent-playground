export function toRecord<K extends string, V>(
  entries: ReadonlyArray<readonly [K, V]>,
): Record<K, V> {
  const result = {} as Record<K, V>;
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}
