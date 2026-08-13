export function mapValues<TValue, TResult>(
  value: Record<string, TValue>,
  mapper: (value: TValue, key: string) => TResult,
): Record<string, TResult> {
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, mapper(entry, key)]),
  );
}