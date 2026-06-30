export function takeArray<T>(items: readonly T[], count: number): T[] {
  return items.slice(0, Math.max(0, count));
}