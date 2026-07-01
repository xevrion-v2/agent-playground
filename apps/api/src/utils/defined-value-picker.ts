export function pickDefinedValues<T extends Record<string, unknown>>(record: T): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(record) as Array<[keyof T, T[keyof T]]>) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}
