const DEFAULT_START = 0;
const DEFAULT_STEP = 1;

function assertFiniteNumber(value, name) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${name} must be a finite number`);
  }
}

function assertSafeCount(count) {
  if (!Number.isSafeInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative safe integer");
  }
}

/**
 * Creates an endless arithmetic sequence.
 *
 * Always consume this iterator with a bounded helper such as take().
 *
 * @example
 * take(infiniteSequence({ start: 1, step: 2 }), 4); // [1, 3, 5, 7]
 */
export function* infiniteSequence(options = {}) {
  const start = options.start ?? DEFAULT_START;
  const step = options.step ?? DEFAULT_STEP;

  assertFiniteNumber(start, "start");
  assertFiniteNumber(step, "step");

  let value = start;
  while (true) {
    yield value;
    value += step;
  }
}

/**
 * Creates an endless sequence from a reducer.
 *
 * The reducer receives the previous value and the zero-based next index.
 * Consume it with take() to avoid unbounded loops.
 */
export function* recurrenceSequence(seed, nextValue) {
  if (typeof nextValue !== "function") {
    throw new TypeError("nextValue must be a function");
  }

  let value = seed;
  let index = 0;
  while (true) {
    yield value;
    index += 1;
    value = nextValue(value, index);
  }
}

/**
 * Safely consumes a finite prefix from any iterable.
 */
export function take(iterable, count) {
  assertSafeCount(count);

  const values = [];
  if (count === 0) {
    return values;
  }

  for (const value of iterable) {
    values.push(value);
    if (values.length === count) {
      return values;
    }
  }

  return values;
}

export function naturals(start = 0) {
  return infiniteSequence({ start, step: 1 });
}

export function fibonacci() {
  return recurrenceSequence([0, 1], ([previous, current]) => [
    current,
    previous + current
  ]);
}

export function takeFibonacci(count) {
  return take(fibonacci(), count).map(([value]) => value);
}
