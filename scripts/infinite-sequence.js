#!/usr/bin/env node

/**
 * Create an iterator that yields values from a potentially unbounded numeric sequence.
 *
 * @param {number} initialValue
 * @param {(currentValue: number, index: number) => number} nextValue
 */
function createInfiniteSequence(initialValue, nextValue) {
  if (typeof initialValue !== "number" || Number.isNaN(initialValue)) {
    throw new TypeError("initialValue must be a number");
  }

  if (typeof nextValue !== "function") {
    throw new TypeError("nextValue must be a function");
  }

  return {
    [Symbol.iterator]() {
      let current = initialValue;
      let index = 0;

      return {
        next() {
          const value = current;
          current = nextValue(current, index);
          index += 1;
          return { value, done: false };
        },
      };
    },
  };
}

/**
 * Take a bounded number of values from any iterable or iterator.
 */
function take(sequence, limit) {
  if (!Number.isInteger(limit) || limit < 0) {
    throw new TypeError("limit must be an integer >= 0");
  }

  const iterator =
    sequence && typeof sequence[Symbol.iterator] === "function"
      ? sequence[Symbol.iterator]()
      : sequence;

  if (!iterator || typeof iterator.next !== "function") {
    throw new TypeError("sequence must be iterable or an iterator");
  }

  const out = [];

  while (out.length < limit) {
    const item = iterator.next();

    if (!item || item.done) {
      break;
    }

    out.push(item.value);
  }

  return out;
}

module.exports = {
  createInfiniteSequence,
  take,
};
