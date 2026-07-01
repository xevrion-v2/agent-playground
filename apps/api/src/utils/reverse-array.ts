export function reverseArray<T>(values: readonly T[]): T[] {
  return [...values].reverse();
}
