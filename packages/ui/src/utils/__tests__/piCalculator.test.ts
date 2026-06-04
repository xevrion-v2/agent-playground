import { describe, it, expect } from "vitest";
import { calculatePi, verifyPiDigits } from "../piCalculator";

/**
 * Known PI digits (first 100 decimal places).
 *
 * Reference: https://oeis.org/A000796
 */
const PI_100 =
  "14159265358979323846264338327950288419716939937510" +
  "58209749445923078164062862089986280348253421170679";

describe("calculatePi", () => {
  it("throws for decimals < 1", () => {
    expect(() => calculatePi(0)).toThrow();
  });

  it("throws for decimals > 1000", () => {
    expect(() => calculatePi(1001)).toThrow();
  });

  it("starts with 3.", () => {
    const pi = calculatePi(10);
    expect(pi.startsWith("3.")).toBe(true);
  });

  it("matches 10 decimal places", () => {
    const pi = calculatePi(10);
    const expected = "3." + PI_100.slice(0, 10);
    expect(pi).toBe(expected);
  });

  it("matches 20 decimal places", () => {
    const pi = calculatePi(20);
    const expected = "3." + PI_100.slice(0, 20);
    expect(pi).toBe(expected);
  });

  it("matches 50 decimal places", () => {
    const pi = calculatePi(50);
    const expected = "3." + PI_100.slice(0, 50);
    expect(pi).toBe(expected);
  });

  it("matches 100 decimal places", () => {
    const pi = calculatePi(100);
    const expected = "3." + PI_100.slice(0, 100);
    expect(pi).toBe(expected);
  });
});

describe("verifyPiDigits", () => {
  it("returns correct match count", () => {
    const pi = calculatePi(50);
    const frac = pi.split(".")[1];
    const matches = verifyPiDigits(pi, PI_100);
    expect(matches).toBe(50);
  });

  it("returns 0 for malformed input", () => {
    expect(verifyPiDigits("abc", "123")).toBe(0);
  });
});
