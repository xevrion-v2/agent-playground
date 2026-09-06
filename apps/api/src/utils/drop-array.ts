export function dropArray<T>(items: readonly T[], count: number): T[] {
  if (Number.isNaN(count) || count <= 0) {
    return items.slice();
  }

  if (!Number.isFinite(count)) {
    return [];
  }

  return items.slice(Math.trunc(count));
}
