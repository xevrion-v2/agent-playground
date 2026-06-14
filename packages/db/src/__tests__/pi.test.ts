import { describe, it, expect } from "vitest";
import { calculatePI } from "../pi";

describe("calculatePI", () => {
  const REAL_PI = Math.PI;

  it("returns a number close to Math.PI", () => {
    const result = calculatePI();
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(3.14);
    expect(result).toBeLessThan(3.15);
  });

  it("default 12 iterations achieve < 1e-13 error", () => {
    const result = calculatePI();
    expect(Math.abs(result - REAL_PI)).toBeLessThan(1e-13);
  });

  it("higher iterations increase accuracy", () => {
    const low = calculatePI(5);
    const high = calculatePI(20);
    expect(Math.abs(high - REAL_PI)).toBeLessThan(Math.abs(low - REAL_PI));
  });

  it("1 iteration gives a rough approximation", () => {
    const result = calculatePI(1);
    expect(result).toBeGreaterThan(3.0);
    expect(result).toBeLessThan(3.5);
  });
});
