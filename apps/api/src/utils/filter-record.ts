export function filterRecord<T>(
  record: Record<string, T>,
  predicate: (value: T, key: string) => boolean,
): Record<string, T> {
  const filtered: Record<string, T> = {};

  for (const [key, value] of Object.entries(record)) {
    if (predicate(value, key)) {
      filtered[key] = value;
    }
  }

  return filtered;
}
