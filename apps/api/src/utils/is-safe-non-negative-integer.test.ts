import assert from "node:assert/strict";
import test from "node:test";

import { isSafeNonNegativeInteger } from "./is-safe-non-negative-integer.ts";

test("accepts zero, negative zero, and positive safe integers", () => {
  assert.equal(isSafeNonNegativeInteger(0), true);
  assert.equal(isSafeNonNegativeInteger(-0), true);
  assert.equal(isSafeNonNegativeInteger(1), true);
  assert.equal(isSafeNonNegativeInteger(Number.MAX_SAFE_INTEGER), true);
});

test("rejects negative safe integers", () => {
  assert.equal(isSafeNonNegativeInteger(-1), false);
  assert.equal(isSafeNonNegativeInteger(Number.MIN_SAFE_INTEGER), false);
});

test("rejects unsafe or non-integer numbers", () => {
  assert.equal(isSafeNonNegativeInteger(Number.MAX_SAFE_INTEGER + 1), false);
  assert.equal(isSafeNonNegativeInteger(Number.MIN_SAFE_INTEGER - 1), false);
  assert.equal(isSafeNonNegativeInteger(1.5), false);
  assert.equal(isSafeNonNegativeInteger(Number.NaN), false);
  assert.equal(isSafeNonNegativeInteger(Number.POSITIVE_INFINITY), false);
  assert.equal(isSafeNonNegativeInteger(Number.NEGATIVE_INFINITY), false);
});

test("rejects non-number values", () => {
  assert.equal(isSafeNonNegativeInteger("0"), false);
  assert.equal(isSafeNonNegativeInteger(null), false);
  assert.equal(isSafeNonNegativeInteger(undefined), false);
  assert.equal(isSafeNonNegativeInteger(new Number(0)), false);
});
