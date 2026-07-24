import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isSafeNegativeInteger } from "./is-safe-negative-integer.ts";

describe("isSafeNegativeInteger", () => {
  it("accepts negative safe integers", () => {
    assert.equal(isSafeNegativeInteger(-1), true);
    assert.equal(isSafeNegativeInteger(-42), true);
    assert.equal(isSafeNegativeInteger(Number.MIN_SAFE_INTEGER), true);
  });

  it("rejects zero and positive safe integers", () => {
    assert.equal(isSafeNegativeInteger(-0), false);
    assert.equal(isSafeNegativeInteger(0), false);
    assert.equal(isSafeNegativeInteger(1), false);
    assert.equal(isSafeNegativeInteger(Number.MAX_SAFE_INTEGER), false);
  });

  it("rejects unsafe integers and decimals", () => {
    assert.equal(isSafeNegativeInteger(Number.MIN_SAFE_INTEGER - 1), false);
    assert.equal(isSafeNegativeInteger(-1.5), false);
    assert.equal(isSafeNegativeInteger(1.5), false);
  });

  it("rejects non-finite numbers and non-number values", () => {
    assert.equal(isSafeNegativeInteger(Number.NaN), false);
    assert.equal(isSafeNegativeInteger(Number.NEGATIVE_INFINITY), false);
    assert.equal(isSafeNegativeInteger(Number.POSITIVE_INFINITY), false);
    assert.equal(isSafeNegativeInteger("-1"), false);
    assert.equal(isSafeNegativeInteger(null), false);
    assert.equal(isSafeNegativeInteger(undefined), false);
    assert.equal(isSafeNegativeInteger(new Number(-1)), false);
  });
});
