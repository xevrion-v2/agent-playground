/**
 * Type guard that checks whether a value is a readonly array.
 */
export function isArray(value: unknown): value is readonly unknown[] {
  return Array.isArray(value);
}
