import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculatePi, PI_100 } from "./index.js";

describe("calculatePi", () => {
  it("should return '3' for 0 digits", () => {
    assert.equal(calculatePi(0), "3");
  });

  it("should calculate 10 digits correctly", () => {
    const result = calculatePi(10);
    assert.equal(result, "3.1415926535");
  });

  it("should calculate 100 digits correctly", () => {
    const result = calculatePi(100);
    assert.equal(result, PI_100);
  });

  it("should throw for negative digits", () => {
    assert.throws(() => calculatePi(-1), /non-negative safe integer/);
  });

  it("should handle large precision (1000 digits)", () => {
    const result = calculatePi(1000);
    assert.equal(result.length, 1002); // "3." + 1000 digits
    assert.ok(result.startsWith("3.1415926535"));
  });
});
