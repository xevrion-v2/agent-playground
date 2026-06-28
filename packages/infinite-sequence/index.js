"use strict";

function infiniteSequence(start = 0, step = 1) {
  if (!Number.isFinite(start)) {
    throw new TypeError("start must be a finite number");
  }

  if (!Number.isFinite(step) || step === 0) {
    throw new TypeError("step must be a finite non-zero number");
  }

  return {
    [Symbol.iterator]() {
      let current = start;

      return {
        next() {
          const value = current;
          current += step;
          return { value, done: false };
        }
      };
    }
  };
}

function take(iterable, count) {
  if (!Number.isInteger(count) || count < 0) {
    throw new TypeError("count must be a non-negative integer");
  }

  const values = [];
  const iterator = iterable[Symbol.iterator]();

  for (let index = 0; index < count; index += 1) {
    const next = iterator.next();

    if (next.done) {
      break;
    }

    values.push(next.value);
  }

  return values;
}

module.exports = {
  infiniteSequence,
  take
};
