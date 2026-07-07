export function countByKey<T>(
  values: readonly T[],
  selector: (value: T) => string,
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const value of values) {
    const key = selector(value);
    counts[key] = (counts[key] ?? 0) + 1;
  }

  return counts;
}
