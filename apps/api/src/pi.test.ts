import { describe, it, expect } from "vitest";
import { calculatePi, verifyPi } from "./pi.js";

describe("calculatePi", () => {
  it("produces a string starting with 3.", () => {
    const result = calculatePi(10);
    expect(result.startsWith("3.")).toBe(true);
  });

  it("matches known digits for 10 decimal places", () => {
    const result = calculatePi(10);
    expect(result).toBe("3.1415926536");
  });

  it("matches known digits for 50 decimal places", () => {
    const result = calculatePi(50);
    const expected = "3.14159265358979323846264338327950288419716939937510";
    expect(result).toBe(expected);
  });

  it("matches known digits for 100 decimal places", () => {
    const result = calculatePi(100);
    const known =
      "3.14159265358979323846264338327950288419716939937510" +
      "58209749445923078164062862089986280348253421170679";
    expect(result).toBe(known);
  });

  it("clamps digits to minimum 1", () => {
    const result = calculatePi(0);
    expect(result.startsWith("3.")).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(3);
  });

  it("clamps digits to maximum 1000", () => {
    const result = calculatePi(2000);
    // "3." + up to 1000 decimal digits
    expect(result.length).toBeLessThanOrEqual(1002);
  });
});

describe("verifyPi", () => {
  it("accepts correct digits", () => {
    expect(verifyPi(calculatePi(50))).toBe(true);
  });

  it("rejects wrong digits", () => {
    expect(verifyPi("2.718281828")).toBe(false);
  });
});
