export function lastItem<T>(values: readonly T[]): T | undefined {
  return values[values.length - 1];
}
