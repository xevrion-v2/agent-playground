import { describe, it, expect } from "vitest";
import {
  calculatePiLeibniz,
  calculatePiNilakantha,
  calculatePiSpigot
} from "./pi";

describe("Pi Calculation Utilities", () => {
  describe("Leibniz Formula", () => {
    it("should return 0 for 0 iterations", () => {
      expect(calculatePiLeibniz(0)).toBe(0);
    });

    it("should approximate Pi", () => {
      // 1 iteration -> 4 * (1) = 4
      expect(calculatePiLeibniz(1)).toBe(4);
      // 2 iterations -> 4 * (1 - 1/3) = 2.6666...
      expect(calculatePiLeibniz(2)).toBeCloseTo(8 / 3, 5);
      // 1000 iterations is close to 3.14
      expect(calculatePiLeibniz(1000)).toBeCloseTo(Math.PI, 2);
    });
  });

  describe("Nilakantha Series", () => {
    it("should return 3 for 0 iterations", () => {
      expect(calculatePiNilakantha(0)).toBe(3);
    });

    it("should approximate Pi much faster than Leibniz", () => {
      // Nilakantha converges very quickly
      expect(calculatePiNilakantha(100)).toBeCloseTo(Math.PI, 6);
      expect(calculatePiNilakantha(1000)).toBeCloseTo(Math.PI, 9);
    });
  });

  describe("Spigot/Machin Algorithm", () => {
    it("should return '3' for <= 0 digits", () => {
      expect(calculatePiSpigot(0)).toBe("3");
      expect(calculatePiSpigot(-5)).toBe("3");
    });

    it("should calculate exact digits of Pi", () => {
      // Pi = 3.14159265358979323846...
      expect(calculatePiSpigot(2)).toBe("3.14");
      expect(calculatePiSpigot(5)).toBe("3.14159");
      expect(calculatePiSpigot(10)).toBe("3.1415926535");
      expect(calculatePiSpigot(20)).toBe("3.14159265358979323846");
    });
  });
});
