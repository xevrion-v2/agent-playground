export function isNonEmptyArray<T>(
  values: readonly T[],
): values is readonly [T, ...T[]] {
  return values.length > 0;
}
