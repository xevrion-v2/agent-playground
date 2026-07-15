export function compactRecord<T extends Record<string, unknown>>(
  record: T,
): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(record) as Array<[keyof T, T[keyof T]]>) {
    if (value !== null && value !== undefined && value !== false && value !== "") {
      result[key] = value;
    }
  }
  return result;
}
