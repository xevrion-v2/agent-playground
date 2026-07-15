export function mapValues<T extends Record<string, unknown>, U>(
  record: T,
  mapper: (value: T[keyof T], key: keyof T) => U,
): Record<keyof T, U> {
  const result = {} as Record<keyof T, U>;
  for (const key of Object.keys(record) as Array<keyof T>) {
    result[key] = mapper(record[key], key);
  }
  return result;
}
