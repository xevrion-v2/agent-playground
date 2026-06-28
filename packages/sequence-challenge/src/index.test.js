import assert from "node:assert/strict";
import test from "node:test";

import { infiniteSequence, take } from "./index.js";

test("infiniteSequence yields a never-ending arithmetic progression", () => {
  assert.deepEqual(take(infiniteSequence(3, 2), 5), [3, 5, 7, 9, 11]);
});

test("take guards against unsafe iteration lengths", () => {
  assert.throws(() => take(infiniteSequence(), -1), RangeError);
});
