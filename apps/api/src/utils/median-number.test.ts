import assert from "node:assert/strict";
import { test } from "node:test";

import { medianNumber } from "./median-number.ts";

test("returns undefined for an empty list", () => {
  assert.equal(medianNumber([]), undefined);
});

test("returns the middle value for an odd number of values", () => {
  assert.equal(medianNumber([7, 1, 3]), 3);
});

test("returns the average of the two middle values for an even number of values", () => {
  assert.equal(medianNumber([10, 2, 4, 8]), 6);
});

test("does not mutate the input values while sorting", () => {
  const values = [5, 1, 9, 3];

  assert.equal(medianNumber(values), 4);
  assert.deepEqual(values, [5, 1, 9, 3]);
});

test("handles negative and decimal values", () => {
  assert.equal(medianNumber([-1.5, 2.25, 0]), 0);
});
