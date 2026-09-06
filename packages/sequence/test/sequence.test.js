import assert from "node:assert/strict";
import test from "node:test";

import {
  fibonacci,
  infiniteSequence,
  naturals,
  recurrenceSequence,
  take,
  takeFibonacci
} from "../src/index.js";

test("takes a safe prefix from natural numbers", () => {
  assert.deepEqual(take(naturals(), 5), [0, 1, 2, 3, 4]);
});

test("supports custom arithmetic sequence options", () => {
  assert.deepEqual(take(infiniteSequence({ start: 2, step: 3 }), 4), [
    2,
    5,
    8,
    11
  ]);
});

test("supports recurrence-based sequences", () => {
  const powersOfTwo = recurrenceSequence(1, (previous) => previous * 2);

  assert.deepEqual(take(powersOfTwo, 6), [1, 2, 4, 8, 16, 32]);
});

test("documents Fibonacci consumption with bounded helpers", () => {
  assert.deepEqual(takeFibonacci(7), [0, 1, 1, 2, 3, 5, 8]);
  assert.deepEqual(
    take(fibonacci(), 4),
    [
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 3]
    ]
  );
});

test("rejects invalid counts before iterating", () => {
  assert.throws(() => take(naturals(), -1), RangeError);
  assert.throws(() => take(naturals(), 1.5), RangeError);
});

test("rejects invalid arithmetic sequence values", () => {
  assert.throws(() => take(infiniteSequence({ start: Infinity }), 1), TypeError);
  assert.throws(() => take(infiniteSequence({ step: Number.NaN }), 1), TypeError);
});
