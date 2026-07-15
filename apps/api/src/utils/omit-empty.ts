export function omitEmpty<T extends Record<string, unknown>>(value: T): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, entry] of Object.entries(value) as Array<[keyof T, T[keyof T]]>) {
    if (entry === null || entry === undefined || entry === "") {
      continue;
    }
    result[key] = entry;
  }
  return result;
}
