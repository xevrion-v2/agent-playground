export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}
