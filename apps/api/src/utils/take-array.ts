export function takeArray<T>(items: readonly T[], count: number): T[] {
  if (!Number.isFinite(count) || count <= 0) {
    return [];
  }

  return items.slice(0, Math.trunc(count));
}
