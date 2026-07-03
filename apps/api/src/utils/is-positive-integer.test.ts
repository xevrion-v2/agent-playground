import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isPositiveInteger } from "./is-positive-integer";

test("detects positive integers", () => {
  assert.equal(isPositiveInteger(1), true);
  assert.equal(isPositiveInteger(0), false);
  assert.equal(isPositiveInteger(-1), false);
  assert.equal(isPositiveInteger(1.5), false);
  assert.equal(isPositiveInteger(Number.MAX_SAFE_INTEGER), true);
  assert.equal(isPositiveInteger(Number.MAX_SAFE_INTEGER + 1), false);
  assert.equal(isPositiveInteger(Number.NaN), false);
  assert.equal(isPositiveInteger("1"), false);
});

test("narrows to number", () => {
  const value: unknown = 4;

  if (isPositiveInteger(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 4);
  } else {
    assert.fail("Expected narrowing");
  }
});
