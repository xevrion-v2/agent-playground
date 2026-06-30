type Defined<T> = Exclude<T, undefined>;

export function filterMap<T, U>(
  items: readonly T[],
  mapper: (item: T, index: number) => U
): Defined<U>[] {
  const mapped: Defined<U>[] = [];
  let index = 0;

  for (const item of items) {
    const value = mapper(item, index);
    index += 1;

    if (value !== undefined) {
      mapped.push(value as Defined<U>);
    }
  }

  return mapped;
}
