/**
 * Safely creates a compact record from unknown key-value pairs.
 * Filters out null/undefined values and returns a plain object.
 */
export function compactRecord(input: unknown): Record<string, unknown> {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return {};
  }

  const result: Record<string, unknown> = {};
  const record = input as Record<string, unknown>;

  for (const key of Object.keys(record)) {
    const value = record[key];
    if (value !== null && value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}
