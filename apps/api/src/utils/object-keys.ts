export function objectKeys<T extends Record<string, unknown>>(
  record: T,
): Array<keyof T & string> {
  return Object.keys(record) as Array<keyof T & string>;
}
