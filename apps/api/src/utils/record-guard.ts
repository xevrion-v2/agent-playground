/**
 * Type guard that checks whether a value is a plain record
 * (non-null object that is not an array).
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
