export function* naturals(start = 0) {
  let current = start;

  while (true) {
    yield current;
    current += 1;
  }
}

export function* mapSequence(sequence, mapper) {
  for (const value of sequence) {
    yield mapper(value);
  }
}

export function take(sequence, count) {
  const values = [];

  for (const value of sequence) {
    values.push(value);

    if (values.length >= count) {
      break;
    }
  }

  return values;
}

export function describeSequenceExamples() {
  const doubled = take(mapSequence(naturals(1), (value) => value * 2), 5);
  const squares = take(mapSequence(naturals(1), (value) => value ** 2), 5);

  return {
    notes: "Use take() to safely consume only a bounded number of items from infinite iterators.",
    doubled,
    squares
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(JSON.stringify(describeSequenceExamples(), null, 2));
}
