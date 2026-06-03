const assert = require("node:assert/strict");

const { createInfiniteSequence, take } = require("./infinite-sequence.js");

function oddSequenceStartAt1() {
  return createInfiniteSequence(1, (value) => value + 2);
}

{
  const sequence = oddSequenceStartAt1();
  const values = take(sequence, 5);

  assert.deepEqual(values, [1, 3, 5, 7, 9]);
}

{
  const sequence = createInfiniteSequence(1, (value) => value * 2);
  const values = take(sequence, 0);

  assert.deepEqual(values, []);
}

{
  const sequence = createInfiniteSequence(2, (value) => value + 1);
  const values = take(sequence, 4);

  assert.deepEqual(values, [2, 3, 4, 5]);
}
