export function infiniteSequence({ start, next }) {
  if (typeof next !== "function") {
    throw new TypeError("next must be a function");
  }

  return {
    *[Symbol.iterator]() {
      let current = start;
      let index = 0;

      while (true) {
        yield current;
        current = next(current, index);
        index += 1;
      }
    },
    take(count) {
      return takeFromSequence(this, count);
    }
  };
}

export function takeFromSequence(sequence, count) {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative integer");
  }

  const values = [];
  for (const value of sequence) {
    if (values.length >= count) {
      break;
    }
    values.push(value);
  }
  return values;
}

export function naturalNumbers(start = 0) {
  return infiniteSequence({
    start,
    next: (current) => current + 1
  });
}

export function fibonacciSequence() {
  return infiniteSequence({
    start: [0, 1],
    next: ([current, nextValue]) => [nextValue, current + nextValue]
  });
}
