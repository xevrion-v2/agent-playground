export function includesAny<T>(
  values: readonly T[],
  candidates: readonly T[]
): boolean {
  return candidates.some((candidate) => values.includes(candidate));
}
