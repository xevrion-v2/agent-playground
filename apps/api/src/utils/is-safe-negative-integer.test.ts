import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isSafeNegativeInteger } from "./is-safe-negative-integer";

test("detects safe negative integers", () => {
  assert.equal(isSafeNegativeInteger(-1), true);
  assert.equal(isSafeNegativeInteger(Number.MIN_SAFE_INTEGER), true);
  assert.equal(isSafeNegativeInteger(0), false);
  assert.equal(isSafeNegativeInteger(1), false);
  assert.equal(isSafeNegativeInteger(1.5), false);
  assert.equal(isSafeNegativeInteger(Number.MAX_SAFE_INTEGER), false);
  assert.equal(isSafeNegativeInteger(Number.NaN), false);
  assert.equal(isSafeNegativeInteger("1"), false);
});

test("narrows to number", () => {
  const value: unknown = -3;

  if (isSafeNegativeInteger(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, -3);
  } else {
    assert.fail("Expected narrowing");
  }
});
