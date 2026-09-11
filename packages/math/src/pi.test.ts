/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect } from "vitest";
import { calculatePi, calculatePiChudnovsky, calculatePiMachin, validatePi, PI_CONSTANTS, type PiResult } from "./pi";

describe("PI Constants", () => {
  it("provides known PI digits for validation", () => {
    expect(PI_CONSTANTS.PI_10).toBe("3.1415926535");
    expect(PI_CONSTANTS.PI_50.length).toBeGreaterThan(50);
    expect(PI_CONSTANTS.PI_100.length).toBeGreaterThan(100);
  });

  it("has correct first digits of PI", () => {
    expect(PI_CONSTANTS.PI_100.startsWith("3.1415926535")).toBe(true);
  });
});

describe("validatePi", () => {
  it("validates correct PI digits", () => {
    expect(validatePi("3.1415926535", 10)).toBe(true);
    expect(validatePi("3.14159265358979323846", 20)).toBe(true);
  });

  it("rejects incorrect PI digits", () => {
    expect(validatePi("3.1415926536", 10)).toBe(false);
    expect(validatePi("3.14159265358979323847", 20)).toBe(false);
  });

  it("handles exact match", () => {
    expect(validatePi(PI_CONSTANTS.PI_100, 100)).toBe(true);
  });
});

describe("calculatePiChudnovsky", () => {
  it("computes PI to 10 digits accurately", () => {
    const result = calculatePiChudnovsky(10);
    expect(result.algorithm).toBe("chudnovsky");
    expect(result.digits).toBe(10);
    expect(result.iterations).toBeGreaterThan(0);
    expect(result.computationTimeMs).toBeGreaterThanOrEqual(0);
    expect(validatePi(result.pi, 10)).toBe(true);
  });

  it("computes PI to 50 digits accurately", () => {
    const result = calculatePiChudnovsky(50);
    expect(result.digits).toBe(50);
    expect(validatePi(result.pi, 50)).toBe(true);
  });

  it("computes PI to 100 digits accurately", () => {
    const result = calculatePiChudnovsky(100);
    expect(result.digits).toBe(100);
    expect(validatePi(result.pi, 100)).toBe(true);
  });

  it("returns proper result structure", () => {
    const result = calculatePiChudnovsky(20);
    expect(result).toHaveProperty("pi");
    expect(result).toHaveProperty("algorithm", "chudnovsky");
    expect(result).toHaveProperty("digits", 20);
    expect(result).toHaveProperty("iterations");
    expect(result).toHaveProperty("computationTimeMs");
    expect(result).toHaveProperty("validated", false);
  });

  it("throws on invalid digits", () => {
    expect(() => calculatePiChudnovsky(0)).toThrow();
    expect(() => calculatePiChudnovsky(-1)).toThrow();
    expect(() => calculatePiChudnovsky(10001)).toThrow();
  });
});

describe("calculatePiMachin", () => {
  it("computes PI to 10 digits accurately", () => {
    const result = calculatePiMachin(10);
    expect(result.algorithm).toBe("machin");
    expect(result.digits).toBe(10);
    expect(result.iterations).toBeGreaterThan(0);
    expect(validatePi(result.pi, 10)).toBe(true);
  });

  it("computes PI to 50 digits accurately", () => {
    const result = calculatePiMachin(50);
    expect(result.digits).toBe(50);
    expect(validatePi(result.pi, 50)).toBe(true);
  });

  it("computes PI to 100 digits accurately", () => {
    const result = calculatePiMachin(100);
    expect(result.digits).toBe(100);
    expect(validatePi(result.pi, 100)).toBe(true);
  });

  it("returns proper result structure", () => {
    const result = calculatePiMachin(20);
    expect(result).toHaveProperty("pi");
    expect(result).toHaveProperty("algorithm", "machin");
    expect(result).toHaveProperty("digits", 20);
    expect(result).toHaveProperty("iterations");
    expect(result).toHaveProperty("computationTimeMs");
  });

  it("throws on invalid digits", () => {
    expect(() => calculatePiMachin(0)).toThrow();
    expect(() => calculatePiMachin(-1)).toThrow();
    expect(() => calculatePiMachin(10001)).toThrow();
  });
});

describe("calculatePi (auto algorithm selection)", () => {
  it("uses Machin for small digit counts", () => {
    const result = calculatePi({ digits: 10, algorithm: "auto" });
    expect(result.algorithm).toBe("machin");
    expect(validatePi(result.pi, 10)).toBe(true);
  });

  it("uses Chudnovsky for larger digit counts", () => {
    const result = calculatePi({ digits: 200, algorithm: "auto" });
    expect(result.algorithm).toBe("chudnovsky");
    expect(validatePi(result.pi, 100)).toBe(true);
  });

  it("respects explicit algorithm choice", () => {
    const resultChudnovsky = calculatePi({ digits: 50, algorithm: "chudnovsky" });
    expect(resultChudnovsky.algorithm).toBe("chudnovsky");

    const resultMachin = calculatePi({ digits: 50, algorithm: "machin" });
    expect(resultMachin.algorithm).toBe("machin");
  });

  it("validates result when validate=true", () => {
    const result = calculatePi({ digits: 50, validate: true });
    expect(result.validated).toBe(true);
    expect(result.validationPassed).toBe(true);
  });

  it("skips validation when validate=false", () => {
    const result = calculatePi({ digits: 50, validate: false });
    expect(result.validated).toBe(false);
    expect(result.validationPassed).toBeUndefined();
  });

  it("throws on invalid digits", () => {
    expect(() => calculatePi({ digits: 0 })).toThrow();
    expect(() => calculatePi({ digits: -1 })).toThrow();
    expect(() => calculatePi({ digits: 10001 })).toThrow();
  });

  it("returns correct PI string format", () => {
    const result = calculatePi({ digits: 10 });
    expect(result.pi).toMatch(/^3\.\d{10}$/);
    expect(result.pi.startsWith("3.1415926535")).toBe(true);
  });

  it("handles large digit counts", () => {
    const result = calculatePi({ digits: 500, algorithm: "chudnovsky" });
    expect(result.digits).toBe(500);
    expect(result.pi.length).toBe(502); // "3." + 500 digits
    expect(validatePi(result.pi, 100)).toBe(true);
  });
});

describe("Edge cases and precision", () => {
  it("handles 1 digit precision", () => {
    const result = calculatePi({ digits: 1 });
    expect(result.pi).toBe("3.1");
  });

  it("handles 2 digit precision", () => {
    const result = calculatePi({ digits: 2 });
    expect(result.pi).toBe("3.14");
  });

  it("produces consistent results across algorithms for same precision", () => {
    const chudnovsky = calculatePi({ digits: 50, algorithm: "chudnovsky" });
    const machin = calculatePi({ digits: 50, algorithm: "machin" });
    expect(validatePi(chudnovsky.pi, 50)).toBe(true);
    expect(validatePi(machin.pi, 50)).toBe(true);
  });

  it("computation time is reasonable", () => {
    const result = calculatePi({ digits: 100 });
    expect(result.computationTimeMs).toBeLessThan(5000); // Should complete within 5 seconds
  });
});

describe("Overflow and large number handling", () => {
  it("handles large factorial computations", () => {
    // This tests the internal factorial function indirectly
    const result = calculatePiChudnovsky(100);
    expect(result.iterations).toBeGreaterThan(0);
  });

  it("maintains precision with guard digits", () => {
    const result = calculatePi({ digits: 20, validate: true });
    expect(result.validationPassed).toBe(true);
  });
});

describe("Type exports", () => {
  it("exports PiCalculationOptions type", () => {
    const options: import("./pi").PiCalculationOptions = { digits: 50 };
    expect(options.digits).toBe(50);
  });

  it("exports PiResult type", () => {
    const result: import("./pi").PiResult = {
      pi: "3.14159",
      algorithm: "chudnovsky",
      digits: 5,
      iterations: 3,
      computationTimeMs: 10,
      validated: true,
      validationPassed: true,
    };
    expect(result.algorithm).toBe("chudnovsky");
  });
});