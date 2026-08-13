import assert from "node:assert/strict";
import test from "node:test";

import { infiniteSequence, naturals, take } from "./infinite.ts";

test("take limits infinite sequences safely", () => {
  assert.deepEqual(take(infiniteSequence(0, 2), 4), [0, 2, 4, 6]);
});

test("naturals yields 1..n via take", () => {
  assert.deepEqual(take(naturals(), 5), [1, 2, 3, 4, 5]);
});

test("infiniteSequence rejects zero step", () => {
  assert.throws(() => take(infiniteSequence(0, 0), 1));
});
