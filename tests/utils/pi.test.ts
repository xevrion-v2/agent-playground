import { describe, it, expect } from "vitest";
import { calculatePi, calculatePiNilakantha } from "../../packages/math/src/pi";

describe("PI Calculator", () => {
  describe("Leibniz formula", () => {
    it("should calculate PI with reasonable accuracy", () => {
      const pi = calculatePi(100000);
      expect(pi).toBeCloseTo(Math.PI, 2); // Within 0.01
    });

    it("should be more accurate with more iterations", () => {
      const piLow = calculatePi(1000);
      const piHigh = calculatePi(100000);
      
      const errorLow = Math.abs(piLow - Math.PI);
      const errorHigh = Math.abs(piHigh - Math.PI);
      
      expect(errorHigh).toBeLessThan(errorLow);
    });

    it("should handle zero iterations", () => {
      const pi = calculatePi(0);
      expect(pi).toBe(0);
    });
  });

  describe("Nilakantha series", () => {
    it("should calculate PI with reasonable accuracy", () => {
      const pi = calculatePiNilakantha(100);
      expect(pi).toBeCloseTo(Math.PI, 2);
    });

    it("should converge faster than Leibniz", () => {
      const piLeibniz = calculatePi(1000);
      const piNilakantha = calculatePiNilakantha(100);
      
      const errorLeibniz = Math.abs(piLeibniz - Math.PI);
      const errorNilakantha = Math.abs(piNilakantha - Math.PI);
      
      expect(errorNilakantha).toBeLessThan(errorLeibniz);
    });
  });
});
