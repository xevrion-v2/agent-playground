export function mapRecordValues<T, U>(
  record: Record<string, T>,
  mapper: (value: T, key: string) => U
): Record<string, U> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, mapper(value, key)])
  );
}
