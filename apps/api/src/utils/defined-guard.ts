/**
 * Type guard that filters out null and undefined values.
 * Useful with Array.filter to narrow union types.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
