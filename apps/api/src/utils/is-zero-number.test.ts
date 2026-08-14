import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isZeroNumber } from "./is-zero-number";

test("detects zero numbers", () => {
  assert.equal(isZeroNumber(0), true);
  assert.equal(isZeroNumber(-0), true);
  assert.equal(isZeroNumber(1), false);
  assert.equal(isZeroNumber(-1), false);
  assert.equal(isZeroNumber(Number.NaN), false);
  assert.equal(isZeroNumber(Number.POSITIVE_INFINITY), false);
  assert.equal(isZeroNumber("0"), false);
});

test("narrows unknown to number", () => {
  const value: unknown = 0;

  if (isZeroNumber(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 0);
  } else {
    assert.fail("Expected narrowing");
  }
});
