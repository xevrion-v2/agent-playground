export function isNonEmptyArray<T>(items: readonly T[]): items is readonly [T, ...T[]] {
  return items.length > 0;
}