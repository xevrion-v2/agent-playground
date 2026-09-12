export function* infiniteSequence<T>(
  seed: T,
  next: (current: T, index: number) => T
): Generator<T, never, unknown> {
  let value = seed;
  let index = 0;

  while (true) {
    yield value;
    value = next(value, index);
    index += 1;
  }
}

export function take<T>(source: Iterable<T>, count: number): T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative integer");
  }

  const values: T[] = [];
  if (count === 0) {
    return values;
  }

  for (const value of source) {
    values.push(value);
    if (values.length === count) {
      break;
    }
  }

  return values;
}
