import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isBetweenNumber } from "./is-between-number";

test("detects numbers between bounds", () => {
  assert.equal(isBetweenNumber(5, 1, 10), true);
  assert.equal(isBetweenNumber(1, 1, 10), true);
  assert.equal(isBetweenNumber(10, 1, 10), true);
  assert.equal(isBetweenNumber(0, 1, 10), false);
  assert.equal(isBetweenNumber(11, 1, 10), false);
  assert.equal(isBetweenNumber(1.5, 1, 2), true);
  assert.equal(isBetweenNumber(Number.NaN, 1, 10), false);
  assert.equal(isBetweenNumber(Number.POSITIVE_INFINITY, 1, 10), false);
  assert.equal(isBetweenNumber("5", 1, 10), false);
});

test("narrows to number", () => {
  const value: unknown = 7;

  if (isBetweenNumber(value, 1, 10)) {
    const narrowed: number = value;
    assert.equal(narrowed, 7);
  } else {
    assert.fail("Expected narrowing");
  }
});
