export function pluck<T extends Record<string, unknown>, K extends keyof T>(
  records: T[],
  key: K,
): Array<T[K]> {
  return records.map((record) => record[key]);
}
