import assert from "node:assert/strict";
import test from "node:test";

import { infiniteSequence, take } from "./infinite-sequence.mjs";

test("take reads a finite prefix from an infinite sequence", () => {
  assert.deepEqual(take(infiniteSequence(1, 1), 5), [1, 2, 3, 4, 5]);
});

test("infiniteSequence supports custom steps", () => {
  assert.deepEqual(take(infiniteSequence(2, 3), 4), [2, 5, 8, 11]);
});

test("take rejects negative counts", () => {
  assert.throws(() => take(infiniteSequence(), -1), RangeError);
});
