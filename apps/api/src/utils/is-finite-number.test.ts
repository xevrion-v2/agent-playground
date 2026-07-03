import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isFiniteNumber } from "./is-finite-number";

test("detects finite numbers", () => {
  assert.equal(isFiniteNumber(0), true);
  assert.equal(isFiniteNumber(1.5), true);
  assert.equal(isFiniteNumber(-2), true);
  assert.equal(isFiniteNumber(Number.NaN), false);
  assert.equal(isFiniteNumber(Number.POSITIVE_INFINITY), false);
  assert.equal(isFiniteNumber(Number.NEGATIVE_INFINITY), false);
  assert.equal(isFiniteNumber("1"), false);
});

test("narrows unknown to number", () => {
  const value: unknown = 1.5;

  if (isFiniteNumber(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 1.5);
  } else {
    assert.fail("Expected narrowing");
  }
});
