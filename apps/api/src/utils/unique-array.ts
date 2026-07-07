export function uniqueArray<T>(items: readonly T[]): T[];
export function uniqueArray<T, K>(
  items: readonly T[],
  selector: (item: T) => K
): T[];
export function uniqueArray<T, K>(
  items: readonly T[],
  selector?: (item: T) => K
): T[] {
  const seen = new Set<T | K>();
  const unique: T[] = [];

  for (const item of items) {
    const key = selector ? selector(item) : item;

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  }

  return unique;
}
