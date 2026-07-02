export function filterRecord<T>(
  record: Record<string, T>,
  predicate: (key: string, value: T) => boolean
): Record<string, T> {
  return Object.fromEntries(
    Object.entries(record).filter(([key, value]) => predicate(key, value))
  );
}
