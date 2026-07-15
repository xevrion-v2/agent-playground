export function includesAll<T>(
  candidates: readonly T[],
  values: readonly T[],
): boolean {
  return candidates.every((candidate) => values.includes(candidate));
}
