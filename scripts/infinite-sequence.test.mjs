import assert from "node:assert/strict";
import test from "node:test";

import { fibonacci, naturalNumbers, sequence, take } from "./infinite-sequence.mjs";

test("take consumes a bounded prefix from an infinite arithmetic sequence", () => {
  assert.deepEqual(take(naturalNumbers(1), 5), [1, 2, 3, 4, 5]);
  assert.deepEqual(take(naturalNumbers(10, 2), 4), [10, 12, 14, 16]);
});

test("fibonacci produces a deterministic infinite sequence", () => {
  assert.deepEqual(take(fibonacci(), 8), [0, 1, 1, 2, 3, 5, 8, 13]);
});

test("sequence supports custom recurrence logic", () => {
  const powersOfTwo = sequence(1, (value) => value * 2);

  assert.deepEqual(take(powersOfTwo, 6), [1, 2, 4, 8, 16, 32]);
});

test("take handles empty prefixes without advancing the iterator", () => {
  const iterator = naturalNumbers(5);

  assert.deepEqual(take(iterator, 0), []);
  assert.deepEqual(take(iterator, 3), [5, 6, 7]);
});

test("helpers reject unsafe limits and invalid sequence inputs", () => {
  assert.throws(() => take(naturalNumbers(), -1), /non-negative integer/);
  assert.throws(() => take(naturalNumbers(), 1.5), /non-negative integer/);
  assert.throws(() => naturalNumbers(0, 0), /non-zero step/);
  assert.throws(() => sequence(1, null), /next step/);
});
