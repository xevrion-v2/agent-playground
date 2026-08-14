export function uniqueArray<T>(items: readonly T[]): T[] {
  return Array.from(new Set(items));
}