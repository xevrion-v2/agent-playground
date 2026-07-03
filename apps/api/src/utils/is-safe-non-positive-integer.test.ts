import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isSafeNonPositiveInteger } from "./is-safe-non-positive-integer";

test("detects safe non-positive integers", () => {
  assert.equal(isSafeNonPositiveInteger(-1), true);
  assert.equal(isSafeNonPositiveInteger(0), true);
  assert.equal(isSafeNonPositiveInteger(1), false);
  assert.equal(isSafeNonPositiveInteger(1.5), false);
  assert.equal(isSafeNonPositiveInteger(Number.MIN_SAFE_INTEGER), true);
  assert.equal(isSafeNonPositiveInteger(Number.MAX_SAFE_INTEGER), false);
  assert.equal(isSafeNonPositiveInteger(Number.NaN), false);
  assert.equal(isSafeNonPositiveInteger("0"), false);
});

test("narrows to number", () => {
  const value: unknown = 0;

  if (isSafeNonPositiveInteger(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 0);
  } else {
    assert.fail("Expected narrowing");
  }
});
