export function mapRecordValues<T, U>(
  record: Record<string, T>,
  mapper: (value: T, key: string) => U,
): Record<string, U> {
  const mapped: Record<string, U> = {};

  for (const [key, value] of Object.entries(record)) {
    mapped[key] = mapper(value, key);
  }

  return mapped;
}
