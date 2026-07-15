export function countByKey<T>(items: readonly T[], key: keyof T): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    const marker = String(item[key]);
    counts[marker] = (counts[marker] ?? 0) + 1;
  }
  return counts;
}
