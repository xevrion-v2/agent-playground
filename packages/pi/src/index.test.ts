import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculatePiPrefix, explainPiLimit, integerSqrt } from "./index.js";

const PI_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

describe("calculatePiPrefix", () => {
  it("returns only the integer part when no decimal places are requested", () => {
    assert.equal(calculatePiPrefix(0), "3");
  });

  it("calculates known finite decimal prefixes", () => {
    assert.equal(calculatePiPrefix(10), "3.1415926535");
    assert.equal(calculatePiPrefix(50), PI_100.slice(0, 52));
    assert.equal(calculatePiPrefix(100), PI_100);
  });

  it("rejects unsupported precision inputs", () => {
    assert.throws(() => calculatePiPrefix(-1), RangeError);
    assert.throws(() => calculatePiPrefix(1.5), RangeError);
    assert.throws(() => calculatePiPrefix(10001), RangeError);
  });
});

describe("integerSqrt", () => {
  it("returns the floored square root for bigint values", () => {
    assert.equal(integerSqrt(0n), 0n);
    assert.equal(integerSqrt(1n), 1n);
    assert.equal(integerSqrt(2n), 1n);
    assert.equal(integerSqrt(10_000n), 100n);
    assert.equal(integerSqrt(10_001n), 100n);
  });
});

describe("explainPiLimit", () => {
  it("documents why a finite implementation returns prefixes", () => {
    assert.match(explainPiLimit(), /no final decimal point/i);
    assert.match(explainPiLimit(), /finite decimal prefixes/i);
  });
});
