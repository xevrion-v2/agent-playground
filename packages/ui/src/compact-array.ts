export function compactArray<T>(values: readonly (T | null | undefined)[]): T[] {
  return values.filter((v): v is T => v != null);
}
