import test from "node:test";
import assert from "node:assert/strict";

import { describeSequenceExamples, mapSequence, naturals, take } from "./infinite-sequence.mjs";

test("naturals yields an increasing sequence from the chosen start", () => {
  assert.deepEqual(take(naturals(3), 5), [3, 4, 5, 6, 7]);
});

test("mapSequence transforms values lazily", () => {
  assert.deepEqual(take(mapSequence(naturals(1), (value) => value * 3), 4), [3, 6, 9, 12]);
});

test("describeSequenceExamples documents safe bounded consumption", () => {
  assert.deepEqual(describeSequenceExamples(), {
    notes: "Use take() to safely consume only a bounded number of items from infinite iterators.",
    doubled: [2, 4, 6, 8, 10],
    squares: [1, 4, 9, 16, 25]
  });
});
