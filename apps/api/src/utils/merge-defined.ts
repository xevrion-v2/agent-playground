export function mergeDefined<T extends Record<string, unknown>>(
  ...records: Array<Partial<T> | null | undefined>
): Partial<T> {
  const result: Partial<T> = {};
  for (const record of records) {
    if (!record) {
      continue;
    }
    for (const [key, value] of Object.entries(record) as Array<[keyof T, T[keyof T]]>) {
      if (value !== null && value !== undefined) {
        result[key] = value;
      }
    }
  }
  return result;
}
