export function dropArray<T>(items: readonly T[], count: number): T[] {
  return items.slice(Math.max(0, count));
}