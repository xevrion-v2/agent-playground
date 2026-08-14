export function filterMap<T, U>(items: readonly T[], mapper: (item: T) => U | undefined): U[] {
  const mapped: U[] = [];

  for (const item of items) {
    const value = mapper(item);
    if (value !== undefined) {
      mapped.push(value);
    }
  }

  return mapped;
}