import assert from "node:assert/strict";
import test from "node:test";

import { infiniteSequence, take } from "./index";

test("take safely consumes a bounded natural-number sequence", () => {
  const naturals = infiniteSequence(0, (value) => value + 1);

  assert.deepEqual(take(naturals, 5), [0, 1, 2, 3, 4]);
});

test("infiniteSequence supports custom recurrence functions", () => {
  const powersOfTwo = infiniteSequence(1, (value) => value * 2);

  assert.deepEqual(take(powersOfTwo, 6), [1, 2, 4, 8, 16, 32]);
});

test("take handles zero and rejects invalid bounds", () => {
  const sequence = infiniteSequence(10, (value) => value + 10);

  assert.deepEqual(take(sequence, 0), []);
  assert.throws(() => take(sequence, -1), /non-negative integer/);
  assert.throws(() => take(sequence, 1.5), /non-negative integer/);
});
