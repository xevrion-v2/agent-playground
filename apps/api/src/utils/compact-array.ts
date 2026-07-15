export function compactArray<T>(values: Array<T | null | undefined | false | "">): T[] {
  return values.filter((value): value is T => Boolean(value) || value === 0);
}
