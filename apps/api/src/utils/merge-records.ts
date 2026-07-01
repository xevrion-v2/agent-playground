export function mergeRecords<T extends Record<string, unknown>>(
  ...records: ReadonlyArray<Partial<T>>
): T {
  return Object.assign({}, ...records) as T;
}
