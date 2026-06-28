export type InfiniteSequence<T> = IterableIterator<T>;

/**
 * Create an infinite arithmetic sequence.
 *
 * Use `take(countFrom(...), count)` to consume a bounded number of values.
 */
export function* countFrom(start = 0, step = 1): InfiniteSequence<number> {
  let value = start;

  while (true) {
    yield value;
    value += step;
  }
}

/**
 * Repeat the same value forever.
 *
 * This is useful for fixtures, but consumers should always bound reads with
 * `take` or their own terminating condition.
 */
export function* repeat<T>(value: T): InfiniteSequence<T> {
  while (true) {
    yield value;
  }
}

/**
 * Create an infinite sequence by calling `nextValue` with a zero-based index.
 */
export function* generate<T>(nextValue: (index: number) => T): InfiniteSequence<T> {
  let index = 0;

  while (true) {
    yield nextValue(index);
    index += 1;
  }
}

/**
 * Safely materialize at most `count` values from any iterable, including an
 * infinite sequence.
 */
export function take<T>(sequence: Iterable<T>, count: number): T[] {
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative safe integer");
  }

  const iterator = sequence[Symbol.iterator]();
  const values: T[] = [];

  while (values.length < count) {
    const next = iterator.next();
    if (next.done) {
      break;
    }

    values.push(next.value);
  }

  return values;
}
