import { describe, it, expect } from "vitest";
import { calculatePi, calculatePiError } from "../../packages/utils/src/pi";

describe("PI Calculator", () => {
  it("should calculate PI with reasonable accuracy", () => {
    const result = calculatePi(1000000);
    // Should be within 0.001 of actual PI
    expect(result).toBeCloseTo(Math.PI, 3);
  });

  it("should improve accuracy with more iterations", () => {
    const low = calculatePi(10000);
    const high = calculatePi(1000000);
    
    const lowError = Math.abs(low - Math.PI);
    const highError = Math.abs(high - Math.PI);
    
    // More iterations should mean less error
    expect(highError).toBeLessThan(lowError);
  });

  it("should return error information", () => {
    const result = calculatePiError(1000000);
    
    expect(result.calculated).toBeCloseTo(Math.PI, 3);
    expect(result.error).toBeLessThan(0.001);
    expect(result.iterations).toBe(1000000);
  });

  it("should handle small iteration count", () => {
    const result = calculatePi(100);
    // Even with few iterations, should be in the right ballpark
    expect(result).toBeGreaterThan(3.0);
    expect(result).toBeLessThan(3.3);
  });
});
