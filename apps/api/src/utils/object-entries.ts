export function objectEntries<T extends Record<string, unknown>>(
  record: T,
): Array<[keyof T & string, T[keyof T & string]]> {
  return Object.entries(record) as Array<[keyof T & string, T[keyof T & string]]>;
}
