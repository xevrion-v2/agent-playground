export function objectValues<T extends Record<string, unknown>>(
  record: T,
): Array<T[keyof T]> {
  return Object.values(record) as Array<T[keyof T]>;
}
