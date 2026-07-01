import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isNonPositiveInteger } from "./is-non-positive-integer.ts";

describe("isNonPositiveInteger", () => {
  it("accepts zero and negative integers", () => {
    assert.equal(isNonPositiveInteger(0), true);
    assert.equal(isNonPositiveInteger(-0), true);
    assert.equal(isNonPositiveInteger(-1), true);
    assert.equal(isNonPositiveInteger(-42), true);
  });

  it("rejects positive integers", () => {
    assert.equal(isNonPositiveInteger(1), false);
    assert.equal(isNonPositiveInteger(42), false);
  });

  it("rejects decimals and non-finite numbers", () => {
    assert.equal(isNonPositiveInteger(-1.5), false);
    assert.equal(isNonPositiveInteger(0.5), false);
    assert.equal(isNonPositiveInteger(Number.NaN), false);
    assert.equal(isNonPositiveInteger(Number.POSITIVE_INFINITY), false);
    assert.equal(isNonPositiveInteger(Number.NEGATIVE_INFINITY), false);
  });

  it("rejects non-number values", () => {
    assert.equal(isNonPositiveInteger("-1"), false);
    assert.equal(isNonPositiveInteger(null), false);
    assert.equal(isNonPositiveInteger(undefined), false);
    assert.equal(isNonPositiveInteger({ value: -1 }), false);
    assert.equal(isNonPositiveInteger(new Number(-1)), false);
  });
});
