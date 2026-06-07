/**
 * Tests for @taskflow/pi-calc — computePi function.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { computePi } from "../src/index.js";

// Known first 100 digits of PI (NIST reference)
const PI_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

describe("computePi", () => {
  it("should compute PI to 100 decimal places", () => {
    const result = computePi(100);
    assert.equal(result, PI_100);
  });

  it("should compute PI to 10 decimal places", () => {
    const result = computePi(10);
    assert.equal(result, "3.1415926535");
  });

  it("should compute PI to 1 decimal place", () => {
    const result = computePi(1);
    assert.equal(result, "3.1");
  });

  it("should compute PI to 0 decimal places", () => {
    const result = computePi(0);
    assert.equal(result, "3.");
  });

  it("should throw for negative digits", () => {
    assert.throws(() => computePi(-1), RangeError);
  });

  it("should throw for too many digits", () => {
    assert.throws(() => computePi(100_001), RangeError);
  });

  it("should produce deterministic output", () => {
    const a = computePi(80);
    const b = computePi(80);
    assert.equal(a, b);
  });

  it("should start with 3.14 for any precision >= 2", () => {
    for (const d of [2, 10, 50, 200]) {
      assert.ok(computePi(d).startsWith("3.14"), `fails at ${d} digits`);
    }
  });
});
