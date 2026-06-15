export function* infiniteSequence(start = 0, step = 1) {
  let current = start;

  while (true) {
    yield current;
    current += step;
  }
}

export function take(sequence, count) {
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
