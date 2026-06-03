export type SequenceGenerator<T> = (index: number, previous: T | undefined) => T;

export type InfiniteSequence<T> = Iterable<T> & {
  take: (count: number) => T[];
};

export function createInfiniteSequence<T>(
  generate: SequenceGenerator<T>
): InfiniteSequence<T> {
  function* values() {
    let index = 0;
    let previous: T | undefined;

    while (true) {
      const next = generate(index, previous);
      previous = next;
      index += 1;
      yield next;
    }
  }

  return {
    [Symbol.iterator]: values,
    take(count: number) {
      if (!Number.isInteger(count) || count < 0) {
        throw new Error("count must be a non-negative integer");
      }

      const iterator = values();
      const items: T[] = [];

      for (let index = 0; index < count; index += 1) {
        const result = iterator.next();

        if (result.done) {
          break;
        }

        items.push(result.value);
      }

      return items;
    }
  };
}

export function createArithmeticSequence(
  start: number,
  step: number
): InfiniteSequence<number> {
  return createInfiniteSequence((index) => start + index * step);
}
