export type SequenceStep<T> = (current: T, index: number) => T;

/**
 * A restartable, lazy sequence whose iterators do not terminate on their own.
 *
 * Consume it through {@link take} or {@link InfiniteSequence.take}; collecting
 * the sequence directly with spread syntax or `Array.from` will never finish.
 */
export class InfiniteSequence<T> implements Iterable<T> {
  readonly #iteratorFactory: () => Iterator<T>;

  constructor(iteratorFactory: () => Iterator<T>) {
    if (typeof iteratorFactory !== "function") {
      throw new TypeError("iteratorFactory must be a function");
    }

    this.#iteratorFactory = iteratorFactory;
  }

  [Symbol.iterator](): Iterator<T> {
    const iterator = this.#iteratorFactory();

    if (iterator === null || typeof iterator.next !== "function") {
      throw new TypeError("iteratorFactory must return an iterator");
    }

    return iterator;
  }

  /** Return a lazy view that yields at most `count` values. */
  take(count: number): Iterable<T> {
    return take(this, count);
  }
}

/**
 * Build an infinite recurrence starting with `seed`.
 *
 * `step` is called only when another value is requested. Its index starts at
 * zero for the transition from the seed to the second value.
 */
export function infiniteSequence<T>(
  seed: T,
  step: SequenceStep<T>,
): InfiniteSequence<T> {
  if (typeof step !== "function") {
    throw new TypeError("step must be a function");
  }

  return new InfiniteSequence(function* sequenceIterator() {
    let current = seed;
    let index = 0;

    while (true) {
      yield current;
      current = step(current, index);
      index += 1;
    }
  });
}

/**
 * Lazily yield no more than `count` values from any iterable.
 *
 * The source iterator is closed when the limit is reached or the consumer
 * stops early. Invalid counts fail immediately, before the source is opened.
 */
export function take<T>(source: Iterable<T>, count: number): Iterable<T> {
  if (
    source === null ||
    source === undefined ||
    typeof source[Symbol.iterator] !== "function"
  ) {
    throw new TypeError("source must be iterable");
  }

  if (!Number.isSafeInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative safe integer");
  }

  return {
    *[Symbol.iterator](): Generator<T, void, undefined> {
      if (count === 0) {
        return;
      }

      const iterator = source[Symbol.iterator]();
      let exhausted = false;

      try {
        for (let yielded = 0; yielded < count; yielded += 1) {
          const result = iterator.next();

          if (result.done) {
            exhausted = true;
            return;
          }

          yield result.value;
        }
      } finally {
        if (!exhausted && typeof iterator.return === "function") {
          iterator.return();
        }
      }
    },
  };
}
