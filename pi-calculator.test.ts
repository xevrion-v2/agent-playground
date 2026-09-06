import { describe, it, expect } from "vitest";
import { calculatePi, calculatePiFast } from "./pi-calculator";

describe("calculatePi", () => {
  it("approximates PI within 0.1 at 1000 terms", () => {
    const result = calculatePi(1000);
    expect(result).toBeGreaterThan(3.0);
    expect(result).toBeLessThan(3.25);
    expect(Math.abs(result - Math.PI)).toBeLessThan(0.1);
  });

  it("converges closer with more terms", () => {
    const low = calculatePi(100);
    const high = calculatePi(100000);
    expect(Math.abs(high - Math.PI)).toBeLessThan(Math.abs(low - Math.PI));
  });

  it("throws on invalid input", () => {
    expect(() => calculatePi(0)).toThrow();
    expect(() => calculatePi(-1)).toThrow();
  });
});

describe("calculatePiFast", () => {
  it("converges to PI quickly", () => {
    const result = calculatePiFast(100);
    expect(Math.abs(result - Math.PI)).toBeLessThan(0.0001);
  });
});
