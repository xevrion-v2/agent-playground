export function dedupeByKey<T>(items: readonly T[], key: keyof T): T[] {
  const seen = new Set<unknown>();
  const result: T[] = [];
  for (const item of items) {
    const marker = item[key];
    if (seen.has(marker)) {
      continue;
    }
    seen.add(marker);
    result.push(item);
  }
  return result;
}
