const MAX_TAKE_COUNT = 100000;

function assertFunction(value, name) {
  if (typeof value !== "function") {
    throw new TypeError(`${name} must be a function`);
  }
}

function assertSafeCount(count) {
  if (!Number.isInteger(count)) {
    throw new TypeError("count must be an integer");
  }

  if (count < 0) {
    throw new RangeError("count must be greater than or equal to 0");
  }

  if (count > MAX_TAKE_COUNT) {
    throw new RangeError(`count must be less than or equal to ${MAX_TAKE_COUNT}`);
  }
}

/**
 * Builds an infinite iterable from a seed value and a transition function.
 *
 * The iterable never ends by itself. Use `take()` or another bounded consumer
 * when materializing values so callers do not accidentally loop forever.
 *
 * @template T
 * @param {T} seed First value emitted by the sequence.
 * @param {(current: T, index: number) => T} nextValue Returns the next value.
 * @returns {IterableIterator<T>} Infinite iterator.
 */
export function infiniteSequence(seed, nextValue) {
  assertFunction(nextValue, "nextValue");

  let current = seed;
  let index = 0;

  return {
    next() {
      const value = current;
      current = nextValue(current, index);
      index += 1;

      return { value, done: false };
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}

/**
 * Safely materializes a bounded number of values from any iterable.
 *
 * @template T
 * @param {Iterable<T>} iterable Iterable to consume.
 * @param {number} count Number of values to collect.
 * @returns {T[]} Collected values.
 */
export function take(iterable, count) {
  assertSafeCount(count);

  if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
    throw new TypeError("iterable must implement Symbol.iterator");
  }

  const values = [];

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

/**
 * Infinite sequence of whole numbers.
 *
 * @param {number} start First number to emit.
 * @returns {IterableIterator<number>} Infinite natural number iterator.
 */
export function naturals(start = 0) {
  if (!Number.isSafeInteger(start)) {
    throw new TypeError("start must be a safe integer");
  }

  return infiniteSequence(start, value => value + 1);
}

/**
 * Infinite Fibonacci sequence.
 *
 * @returns {IterableIterator<number>} Infinite Fibonacci iterator.
 */
export function fibonacci() {
  let previous = 1;

  return infiniteSequence(0, current => {
    const next = previous;
    previous = current + previous;
    return next;
  });
}

/**
 * Lazily maps every value from an iterable, including infinite iterables.
 *
 * @template T
 * @template U
 * @param {Iterable<T>} iterable Source iterable.
 * @param {(value: T, index: number) => U} mapper Mapping function.
 * @returns {IterableIterator<U>} Mapped iterator.
 */
export function mapSequence(iterable, mapper) {
  assertFunction(mapper, "mapper");

  if (iterable == null || typeof iterable[Symbol.iterator] !== "function") {
    throw new TypeError("iterable must implement Symbol.iterator");
  }

  const iterator = iterable[Symbol.iterator]();
  let index = 0;

  return {
    next() {
      const result = iterator.next();

      if (result.done) {
        return { value: undefined, done: true };
      }

      const value = mapper(result.value, index);
      index += 1;

      return { value, done: false };
    },
    [Symbol.iterator]() {
      return this;
    }
  };
}
