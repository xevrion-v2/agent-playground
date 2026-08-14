export function reverseArray<T>(items: readonly T[]): T[] {
  return [...items].reverse();
}