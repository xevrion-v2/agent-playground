import test from "node:test";
import assert from "node:assert/strict";

import { isPositiveNumber } from "./is-positive-number.js";

test("returns true only for finite numbers greater than zero", () => {
  assert.equal(isPositiveNumber(1), true);
  assert.equal(isPositiveNumber(0.001), true);
  assert.equal(isPositiveNumber(Number.MAX_SAFE_INTEGER), true);
});

test("rejects zero, negative numbers, and non-finite numbers", () => {
  assert.equal(isPositiveNumber(0), false);
  assert.equal(isPositiveNumber(-1), false);
  assert.equal(isPositiveNumber(Number.POSITIVE_INFINITY), false);
  assert.equal(isPositiveNumber(Number.NEGATIVE_INFINITY), false);
  assert.equal(isPositiveNumber(Number.NaN), false);
});

test("rejects non-number values", () => {
  assert.equal(isPositiveNumber("1"), false);
  assert.equal(isPositiveNumber(null), false);
  assert.equal(isPositiveNumber(undefined), false);
  assert.equal(isPositiveNumber({ value: 1 }), false);
});
