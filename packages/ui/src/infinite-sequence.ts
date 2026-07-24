export type InfiniteSequenceOptions = {
  start?: number;
  step?: number;
};

export type InfiniteSequence = IterableIterator<number>;

export function createInfiniteSequence({
  start = 0,
  step = 1,
}: InfiniteSequenceOptions = {}): InfiniteSequence {
  if (!Number.isFinite(start)) {
    throw new TypeError("start must be a finite number");
  }

  if (!Number.isFinite(step) || step === 0) {
    throw new TypeError("step must be a finite, non-zero number");
  }

  function* sequence() {
    let current = start;

    while (true) {
      yield current;
      current += step;
    }
  }

  return sequence();
}

export function takeFromSequence<T>(
  sequence: Iterator<T>,
  count: number,
): T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new TypeError("count must be a non-negative integer");
  }

  const values: T[] = [];

  for (let index = 0; index < count; index += 1) {
    const next = sequence.next();

    if (next.done) {
      break;
    }

    values.push(next.value);
  }

  return values;
}
