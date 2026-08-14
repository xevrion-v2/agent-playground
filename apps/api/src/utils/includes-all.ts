export function includesAll<T>(values: readonly T[], candidates: readonly T[]): boolean {
  return candidates.every((candidate) => values.includes(candidate));
}
