import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNegativeNumber } from "./is-negative-number";

test("detects negative numbers", () => {
  assert.equal(isNegativeNumber(-1), true);
  assert.equal(isNegativeNumber(-0), false);
  assert.equal(isNegativeNumber(0), false);
  assert.equal(isNegativeNumber(1), false);
  assert.equal(isNegativeNumber(Number.NaN), false);
  assert.equal(isNegativeNumber(Number.NEGATIVE_INFINITY), false);
  assert.equal(isNegativeNumber("1"), false);
});

test("narrows unknown to number", () => {
  const value: unknown = -1;

  if (isNegativeNumber(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, -1);
  } else {
    assert.fail("Expected narrowing");
  }
});
