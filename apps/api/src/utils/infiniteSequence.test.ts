import assert from "node:assert/strict";
import test from "node:test";

import { createInfiniteSequence, naturalNumbers } from "./infiniteSequence.ts";

test("naturalNumbers can be consumed safely with take", () => {
  const sequence = naturalNumbers(3);

  assert.deepEqual(sequence.take(5), [3, 4, 5, 6, 7]);
});

test("createInfiniteSequence advances from the previous value", () => {
  const powersOfTwo = createInfiniteSequence(1, (value) => value * 2);

  assert.deepEqual(powersOfTwo.take(6), [1, 2, 4, 8, 16, 32]);
});

test("take rejects negative counts", () => {
  const sequence = naturalNumbers();

  assert.throws(() => sequence.take(-1), /non-negative integer/);
});
