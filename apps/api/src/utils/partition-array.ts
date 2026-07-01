export function partitionArray<T>(
  values: readonly T[],
  predicate: (value: T) => boolean,
): [T[], T[]] {
  const matches: T[] = [];
  const nonMatches: T[] = [];
  for (const value of values) {
    (predicate(value) ? matches : nonMatches).push(value);
  }
  return [matches, nonMatches];
}
