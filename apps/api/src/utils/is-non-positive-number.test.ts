import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNonPositiveNumber } from "./is-non-positive-number";

test("detects non-positive numbers", () => {
  assert.equal(isNonPositiveNumber(-1), true);
  assert.equal(isNonPositiveNumber(0), true);
  assert.equal(isNonPositiveNumber(-0), true);
  assert.equal(isNonPositiveNumber(1), false);
  assert.equal(isNonPositiveNumber(Number.NaN), false);
  assert.equal(isNonPositiveNumber(Number.NEGATIVE_INFINITY), false);
  assert.equal(isNonPositiveNumber("0"), false);
});

test("narrows unknown to number", () => {
  const value: unknown = 0;

  if (isNonPositiveNumber(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 0);
  } else {
    assert.fail("Expected narrowing");
  }
});
