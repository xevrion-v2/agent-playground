import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isEvenInteger } from "./is-even-integer";

test("detects even integers", () => {
  assert.equal(isEvenInteger(0), true);
  assert.equal(isEvenInteger(-0), true);
  assert.equal(isEvenInteger(2), true);
  assert.equal(isEvenInteger(-2), true);
  assert.equal(isEvenInteger(1), false);
  assert.equal(isEvenInteger(1.5), false);
  assert.equal(isEvenInteger(Number.NaN), false);
  assert.equal(isEvenInteger("2"), false);
});

test("narrows unknown to number", () => {
  const value: unknown = 2;

  if (isEvenInteger(value)) {
    const narrowed: number = value;
    assert.equal(narrowed, 2);
  } else {
    assert.fail("Expected narrowing");
  }
});
