/**
 * Builds an infinite sequence from an initial state and a deterministic step.
 *
 * The returned iterator is intentionally unbounded. Always consume it through a
 * bounded helper such as `take()` so callers cannot accidentally loop forever.
 *
 * @template T
 * @param {T} seed
 * @param {(current: T, index: number) => T} next
 * @returns {Generator<T, never, unknown>}
 *
 * @example
 * take(sequence(1, (value) => value + 1), 5); // [1, 2, 3, 4, 5]
 */
export function sequence(seed, next) {
  if (typeof next !== "function") {
    throw new TypeError("sequence next step must be a function");
  }

  return (function* generate() {
    let current = seed;
    let index = 0;

    while (true) {
      yield current;
      current = next(current, index);
      index += 1;
    }
  })();
}

/**
 * Safely consumes a finite prefix from any iterable.
 *
 * @template T
 * @param {Iterable<T>} iterable
 * @param {number} count
 * @returns {T[]}
 */
export function take(iterable, count) {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("take count must be a non-negative integer");
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
 * Infinite arithmetic sequence for simple counters and ranges.
 *
 * @param {number} start
 * @param {number} step
 * @returns {Generator<number, never, unknown>}
 */
export function naturalNumbers(start = 0, step = 1) {
  if (!Number.isFinite(start) || !Number.isFinite(step) || step === 0) {
    throw new RangeError("naturalNumbers requires finite start and non-zero step values");
  }

  return sequence(start, (value) => value + step);
}

/**
 * Infinite Fibonacci sequence starting at 0, 1.
 *
 * @returns {Generator<number, never, unknown>}
 */
export function* fibonacci() {
  let previous = 0;
  let current = 1;

  while (true) {
    yield previous;
    [previous, current] = [current, previous + current];
  }
}
