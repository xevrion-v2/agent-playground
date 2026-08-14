export function dropArray<T>(values: readonly T[], count: number): T[] {
  if (count <= 0) {
    return [...values];
  }
  return values.slice(count);
}
