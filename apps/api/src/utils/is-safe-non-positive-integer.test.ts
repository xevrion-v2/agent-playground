import assert from "node:assert/strict";
import test from "node:test";

import { isSafeNonPositiveInteger } from "./is-safe-non-positive-integer.ts";

test("accepts zero, negative zero, and negative safe integers", () => {
  assert.equal(isSafeNonPositiveInteger(0), true);
  assert.equal(isSafeNonPositiveInteger(-0), true);
  assert.equal(isSafeNonPositiveInteger(-1), true);
  assert.equal(isSafeNonPositiveInteger(Number.MIN_SAFE_INTEGER), true);
});

test("rejects positive safe integers", () => {
  assert.equal(isSafeNonPositiveInteger(1), false);
  assert.equal(isSafeNonPositiveInteger(Number.MAX_SAFE_INTEGER), false);
});

test("rejects unsafe or non-integer numbers", () => {
  assert.equal(isSafeNonPositiveInteger(Number.MAX_SAFE_INTEGER + 1), false);
  assert.equal(isSafeNonPositiveInteger(Number.MIN_SAFE_INTEGER - 1), false);
  assert.equal(isSafeNonPositiveInteger(-1.5), false);
  assert.equal(isSafeNonPositiveInteger(NaN), false);
  assert.equal(isSafeNonPositiveInteger(Infinity), false);
  assert.equal(isSafeNonPositiveInteger(-Infinity), false);
});

test("rejects non-number values", () => {
  assert.equal(isSafeNonPositiveInteger("0"), false);
  assert.equal(isSafeNonPositiveInteger(null), false);
  assert.equal(isSafeNonPositiveInteger(undefined), false);
  assert.equal(isSafeNonPositiveInteger(new Number(0)), false);
});
