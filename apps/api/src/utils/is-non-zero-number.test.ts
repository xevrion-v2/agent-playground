import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNonZeroNumber } from "./is-non-zero-number";

test("detects non-zero numbers", () => {
  assert.equal(isNonZeroNumber(1), true);
  assert.equal(isNonZeroNumber(-1), true);
  assert.equal(isNonZeroNumber(0), false);
  assert.equal(isNonZeroNumber(-0), false);
  assert.equal(isNonZeroNumber(Number.NaN), false);
  assert.equal(isNonZeroNumber(Number.POSITIVE_INFINITY), false);
  assert.equal(isNonZeroNumber("1"), false);
});

test("narrows unknown to number", () => {
  const value: unknown = 1;

  if (isNonZeroNumber(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 1);
  } else {
    assert.fail("Expected narrowing");
  }
});
