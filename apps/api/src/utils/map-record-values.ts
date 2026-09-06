export function mapRecordValues<T, U>(
  record: Readonly<Record<string, T>>,
  mapper: (value: T, key: string) => U,
): Record<string, U> {
  const result: Record<string, U> = {};
  for (const [key, value] of Object.entries(record)) {
    result[key] = mapper(value, key);
  }
  return result;
}
