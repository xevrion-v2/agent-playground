import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNonNegativeNumber } from "./is-non-negative-number";

test("detects non-negative numbers", () => {
  assert.equal(isNonNegativeNumber(1), true);
  assert.equal(isNonNegativeNumber(0), true);
  assert.equal(isNonNegativeNumber(-0), true);
  assert.equal(isNonNegativeNumber(-1), false);
  assert.equal(isNonNegativeNumber(Number.NaN), false);
  assert.equal(isNonNegativeNumber(Number.POSITIVE_INFINITY), false);
  assert.equal(isNonNegativeNumber("1"), false);
});

test("narrows unknown to number", () => {
  const value: unknown = 0;

  if (isNonNegativeNumber(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 0);
  } else {
    assert.fail("Expected narrowing");
  }
});
