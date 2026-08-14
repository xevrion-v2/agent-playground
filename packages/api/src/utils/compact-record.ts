/**
 * Compacts a record by removing undefined and null values.
 * @param record - The record to compact.
 * @returns A new record with only defined values.
 */
export function compactRecord<T extends Record<string, unknown>>(
  record: T
): Partial<T> {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(record)) {
    if (value !== undefined && value !== null) {
      result[key as keyof T] = value as T[keyof T];
    }
  }

  return result;
}