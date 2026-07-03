import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNonPositiveInteger } from "./is-non-positive-integer";

test("detects non-positive integers", () => {
  assert.equal(isNonPositiveInteger(-1), true);
  assert.equal(isNonPositiveInteger(0), true);
  assert.equal(isNonPositiveInteger(1), false);
  assert.equal(isNonPositiveInteger(1.5), false);
  assert.equal(isNonPositiveInteger(Number.MIN_SAFE_INTEGER), true);
  assert.equal(isNonPositiveInteger(Number.MAX_SAFE_INTEGER), false);
  assert.equal(isNonPositiveInteger(Number.NaN), false);
  assert.equal(isNonPositiveInteger("0"), false);
});

test("narrows to number", () => {
  const value: unknown = 0;

  if (isNonPositiveInteger(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 0);
  } else {
    assert.fail("Expected narrowing");
  }
});
