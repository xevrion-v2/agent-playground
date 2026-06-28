export function* infiniteSequence(start = 0, step = 1) {
  if (!Number.isFinite(start) || !Number.isFinite(step)) {
    throw new TypeError("start and step must be finite numbers");
  }

  let current = start;
  while (true) {
    yield current;
    current += step;
  }
}

export function take(iterable, count) {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError("count must be a non-negative integer");
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
