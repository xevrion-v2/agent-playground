import assert from "node:assert/strict";
import test from "node:test";

import { isPositiveInteger } from "./is-positive-integer.ts";

test("accepts positive integer numbers", () => {
  assert.equal(isPositiveInteger(1), true);
  assert.equal(isPositiveInteger(42), true);
  assert.equal(isPositiveInteger(Number.MAX_SAFE_INTEGER), true);
});

test("rejects zero and negative integers", () => {
  assert.equal(isPositiveInteger(0), false);
  assert.equal(isPositiveInteger(-0), false);
  assert.equal(isPositiveInteger(-1), false);
});

test("rejects decimal and non-finite numbers", () => {
  assert.equal(isPositiveInteger(1.5), false);
  assert.equal(isPositiveInteger(Number.NaN), false);
  assert.equal(isPositiveInteger(Number.POSITIVE_INFINITY), false);
});

test("rejects non-number values", () => {
  assert.equal(isPositiveInteger("1"), false);
  assert.equal(isPositiveInteger(null), false);
  assert.equal(isPositiveInteger(new Number(1)), false);
});
