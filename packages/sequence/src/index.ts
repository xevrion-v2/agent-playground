export type InfiniteSequence<T> = IterableIterator<T>;

/**
 * Creates a lazy infinite sequence from a seed value and recurrence function.
 *
 * Always consume the result with a bounded helper such as `takeFromSequence`
 * so callers do not accidentally iterate forever.
 */
export function* infiniteSequence<T>(
  seed: T,
  next: (current: T, index: number) => T
): InfiniteSequence<T> {
  let current = seed;
  let index = 0;

  while (true) {
    yield current;
    current = next(current, index);
    index += 1;
  }
}

export function takeFromSequence<T>(sequence: Iterable<T>, count: number): T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative integer");
  }

  const result: T[] = [];
  if (count === 0) {
    return result;
  }

  for (const value of sequence) {
    result.push(value);

    if (result.length === count) {
      break;
    }
  }

  return result;
}

export function naturalNumbers(start = 0): InfiniteSequence<number> {
  return infiniteSequence(start, (value) => value + 1);
}

export function* fibonacciSequence(): InfiniteSequence<number> {
  let previous = 0;
  let current = 1;

  while (true) {
    yield previous;
    [previous, current] = [current, previous + current];
  }
}
