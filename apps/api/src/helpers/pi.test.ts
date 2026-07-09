import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculatePi, ALGORITHM_DOCUMENTATION } from "./pi.js";

describe("calculatePi", () => {
  it("should return 3.0 when iterations is 0", () => {
    assert.equal(calculatePi(0), 3.0);
  });

  it("should converge closer to Math.PI with higher iterations", () => {
    const pi1 = calculatePi(1);
    const pi10 = calculatePi(10);
    const pi100 = calculatePi(100);

    const diff1 = Math.abs(pi1 - Math.PI);
    const diff10 = Math.abs(pi10 - Math.PI);
    const diff100 = Math.abs(pi100 - Math.PI);

    // Verify each step gets closer
    assert.ok(diff10 < diff1);
    assert.ok(diff100 < diff10);
  });

  it("should calculate Pi to high precision with 1000 iterations", () => {
    const pi = calculatePi(1000);
    const expected = 3.1415926535; // Pi to 10 decimal places
    
    // Difference should be extremely small (less than 1e-9)
    assert.ok(Math.abs(pi - expected) < 1e-9);
  });

  it("should throw an error for negative iterations", () => {
    assert.throws(() => calculatePi(-5), /Iterations must be a non-negative integer/);
  });

  it("should provide metadata and algorithm documentation", () => {
    assert.equal(ALGORITHM_DOCUMENTATION.name, "Nilakantha Series");
    assert.ok(typeof ALGORITHM_DOCUMENTATION.description === "string");
    assert.ok(typeof ALGORITHM_DOCUMENTATION.formula === "string");
  });
});
