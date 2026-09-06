import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNonNegativeInteger } from "./is-non-negative-integer";

test("detects non-negative integers", () => {
  assert.equal(isNonNegativeInteger(0), true);
  assert.equal(isNonNegativeInteger(1), true);
  assert.equal(isNonNegativeInteger(Number.MIN_SAFE_INTEGER), false);
  assert.equal(isNonNegativeInteger(1.5), false);
  assert.equal(isNonNegativeInteger(Number.NaN), false);
  assert.equal(isNonNegativeInteger("0"), false);
});

test("narrows to number", () => {
  const value: unknown = 2;

  if (isNonNegativeInteger(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 2);
  } else {
    assert.fail("Expected narrowing");
  }
});
