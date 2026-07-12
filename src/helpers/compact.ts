/**
 * Compact helper - removes nullish entries from a readonly array while preserving item types.
 * No runtime dependencies. TypeScript strict compilation safe.
 */

export function compact<T>(arr: readonly T[]): NonNullable<T>[] {
  const result: NonNullable<T>[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item != null) {
      result.push(item);
    }
  }
  return result;
}
