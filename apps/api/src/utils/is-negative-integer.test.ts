import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNegativeInteger } from "./is-negative-integer";

test("detects negative integers", () => {
  assert.equal(isNegativeInteger(-1), true);
  assert.equal(isNegativeInteger(Number.MIN_SAFE_INTEGER), true);
  assert.equal(isNegativeInteger(-1.5), false);
  assert.equal(isNegativeInteger(0), false);
  assert.equal(isNegativeInteger(1), false);
  assert.equal(isNegativeInteger(Number.NaN), false);
  assert.equal(isNegativeInteger("1"), false);
});

test("narrows to number", () => {
  const value: unknown = -4;

  if (isNegativeInteger(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, -4);
  } else {
    assert.fail("Expected narrowing");
  }
});
