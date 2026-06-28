import { describe, it, expect } from "vitest";
import { computePi } from "./pi.js";

const KNOWN_PI_50 =
  "3.14159265358979323846264338327950288419716939937510";

describe("computePi", () => {
  it("starts with 3.14159265358979", () => {
    const pi = computePi(50);
    expect(pi.startsWith("3.14159265358979")).toBe(true);
  });

  it("returns the correct first 50 decimal digits", () => {
    const pi = computePi(50);
    expect(pi).toBe(KNOWN_PI_50);
  });

  it("returns correct result for 10 digits", () => {
    const pi = computePi(10);
    expect(pi.startsWith("3.1415926535")).toBe(true);
  });

  it("returns a string", () => {
    expect(typeof computePi()).toBe("string");
  });
});
