import assert from "node:assert/strict";
import test from "node:test";

import { isSafePositiveInteger } from "./is-safe-positive-integer.ts";

test("accepts positive safe integers", () => {
  assert.equal(isSafePositiveInteger(1), true);
  assert.equal(isSafePositiveInteger(42), true);
  assert.equal(isSafePositiveInteger(Number.MAX_SAFE_INTEGER), true);
});

test("rejects zero, negative zero, and negative integers", () => {
  assert.equal(isSafePositiveInteger(0), false);
  assert.equal(isSafePositiveInteger(-0), false);
  assert.equal(isSafePositiveInteger(-1), false);
  assert.equal(isSafePositiveInteger(Number.MIN_SAFE_INTEGER), false);
});

test("rejects unsafe or non-integer numbers", () => {
  assert.equal(isSafePositiveInteger(Number.MAX_SAFE_INTEGER + 1), false);
  assert.equal(isSafePositiveInteger(1.5), false);
  assert.equal(isSafePositiveInteger(Number.NaN), false);
  assert.equal(isSafePositiveInteger(Number.POSITIVE_INFINITY), false);
  assert.equal(isSafePositiveInteger(Number.NEGATIVE_INFINITY), false);
});

test("rejects non-number values", () => {
  assert.equal(isSafePositiveInteger("1"), false);
  assert.equal(isSafePositiveInteger(null), false);
  assert.equal(isSafePositiveInteger(undefined), false);
  assert.equal(isSafePositiveInteger(new Number(1)), false);
});
