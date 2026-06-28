export type NextValue<T> = (current: T, index: number) => T;

export function* infiniteSequence<T>(seed: T, nextValue: NextValue<T>): IterableIterator<T> {
  let current = seed;
  let index = 0;

  while (true) {
    yield current;
    current = nextValue(current, index);
    index += 1;
  }
}

export function naturals(start = 0, step = 1): IterableIterator<number> {
  if (!Number.isFinite(start) || !Number.isFinite(step)) {
    throw new RangeError("start and step must be finite numbers");
  }

  return infiniteSequence(start, (value) => value + step);
}

export function* fibonacci(): IterableIterator<bigint> {
  let previous = 0n;
  let current = 1n;

  while (true) {
    yield previous;
    [previous, current] = [current, previous + current];
  }
}

export function take<T>(iterable: Iterable<T>, count: number): T[] {
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative safe integer");
  }

  const values: T[] = [];
  if (count === 0) {
    return values;
  }

  for (const value of iterable) {
    values.push(value);

    if (values.length === count) {
      break;
    }
  }

  return values;
}
