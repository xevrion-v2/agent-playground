import { describe, it, expect } from "vitest";
import { calculatePI, calculatePI_BBP } from "../pi";

describe("PI Calculation", () => {
  describe("calculatePI (Leibniz formula)", () => {
    it("should approximate PI with default iterations", () => {
      const result = calculatePI();
      expect(result).toBeCloseTo(Math.PI, 4);
    });

    it("should improve accuracy with more iterations", () => {
      const low = calculatePI(100);
      const high = calculatePI(100000);
      const errLow = Math.abs(low - Math.PI);
      const errHigh = Math.abs(high - Math.PI);
      expect(errHigh).toBeLessThan(errLow);
    });

    it("should handle zero iterations", () => {
      const result = calculatePI(0);
      expect(result).toBe(0);
    });

    it("should throw on negative iterations", () => {
      expect(() => calculatePI(-1)).toThrow("non-negative");
    });
  });

  describe("calculatePI_BBP (Bailey-Borwein-Plouffe)", () => {
    it("should approximate PI with 50 terms", () => {
      const result = calculatePI_BBP(50);
      expect(result).toBeCloseTo(Math.PI, 10);
    });

    it("should converge quickly", () => {
      const result = calculatePI_BBP(20);
      expect(result).toBeCloseTo(Math.PI, 8);
    });

    it("should throw on negative terms", () => {
      expect(() => calculatePI_BBP(-1)).toThrow("non-negative");
    });
  });
});
