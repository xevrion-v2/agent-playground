import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isInteger } from "./is-integer";

test("detects integers", () => {
  assert.equal(isInteger(0), true);
  assert.equal(isInteger(-0), true);
  assert.equal(isInteger(1), true);
  assert.equal(isInteger(-1), true);
  assert.equal(isInteger(1.2), false);
  assert.equal(isInteger(Number.NaN), false);
  assert.equal(isInteger(Number.POSITIVE_INFINITY), false);
  assert.equal(isInteger("1"), false);
});

test("narrows unknown to number", () => {
  const value: unknown = 1;

  if (isInteger(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 1);
  } else {
    assert.fail("Expected narrowing");
  }
});
