/**
 * Trims string values in a record.
 * @module utils/trim-record-values
 */
export function trimRecordValues<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [
      k,
      typeof v === "string" ? v.trim() : v,
    ])
  ) as Partial<T>;
}
