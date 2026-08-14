export function includesAny<T>(
  candidates: readonly T[],
  values: readonly T[],
): boolean {
  return candidates.some((candidate) => values.includes(candidate));
}
