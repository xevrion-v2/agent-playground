export type InfiniteSequence<T> = Iterable<T> & {
  take(count: number): T[];
};

/**
 * Creates an infinite iterable that is safe to consume through bounded helpers.
 *
 * Example:
 * ```ts
 * const odds = createInfiniteSequence(1, (value) => value + 2);
 * odds.take(3); // [1, 3, 5]
 * ```
 */
export function createInfiniteSequence<T>(
  initialValue: T,
  nextValue: (currentValue: T, index: number) => T
): InfiniteSequence<T> {
  function* iterator() {
    let currentValue = initialValue;
    let index = 0;

    while (true) {
      yield currentValue;
      currentValue = nextValue(currentValue, index);
      index += 1;
    }
  }

  return {
    [Symbol.iterator]: iterator,
    take(count: number) {
      if (!Number.isInteger(count) || count < 0) {
        throw new Error("Sequence take count must be a non-negative integer.");
      }

      const values: T[] = [];
      const valuesIterator = iterator();

      for (let index = 0; index < count; index += 1) {
        values.push(valuesIterator.next().value);
      }

      return values;
    }
  };
}

export function naturalNumbers(start = 0) {
  return createInfiniteSequence(start, (value) => value + 1);
}
