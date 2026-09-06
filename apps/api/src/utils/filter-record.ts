export function filterRecord<T>(
  record: Readonly<Record<string, T>>,
  predicate: (value: T, key: string) => boolean,
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const [key, value] of Object.entries(record)) {
    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}
