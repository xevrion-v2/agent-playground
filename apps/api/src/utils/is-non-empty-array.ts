export function isNonEmptyArray<T>(value: readonly T[]): value is readonly [T, ...T[]] {
  return value.length > 0;
}
