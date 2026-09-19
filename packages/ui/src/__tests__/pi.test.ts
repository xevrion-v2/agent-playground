import { describe, it, expect } from "vitest";
import { computePi, verifyPi, PI_1000 } from "../pi";

describe("computePi", () => {
  it("should compute Pi to 10 digits", () => {
    const pi = computePi(10);
    expect(pi).toMatch(/^3\.\d{10}$/);
    expect(verifyPi(pi, PI_1000)).toBeGreaterThanOrEqual(11); // "3." + 9 digits
  });

  it("should compute Pi to 100 digits", () => {
    const pi = computePi(100);
    expect(pi).toMatch(/^3\.\d{100}$/);
    const matches = verifyPi(pi, PI_1000);
    expect(matches).toBeGreaterThanOrEqual(100);
  });

  it("should compute Pi to 500 digits", () => {
    const pi = computePi(500);
    expect(pi).toMatch(/^3\.\d{500}$/);
    const matches = verifyPi(pi, PI_1000);
    expect(matches).toBeGreaterThanOrEqual(500);
  }, 30000); // 30 second timeout for larger computation

  it("should return valid Pi for 1 digit", () => {
    const pi = computePi(1);
    expect(pi).toBe("3.1");
  });

  it("should throw for invalid digits", () => {
    expect(() => computePi(0)).toThrow("digits must be >= 1");
    expect(() => computePi(-1)).toThrow("digits must be >= 1");
  });
});

describe("verifyPi", () => {
  it("should verify exact match", () => {
    expect(verifyPi("3.14", "3.14159")).toBe(4);
  });

  it("should return 0 for mismatch at first position", () => {
    expect(verifyPi("4.14", "3.14159")).toBe(0);
  });
});