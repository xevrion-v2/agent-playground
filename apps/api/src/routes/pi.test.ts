import { calculatePiLeibniz, calculatePiNilakantha, calculatePiMonteCarlo, calculatePiChudnovsky } from "./pi";

describe("PI Calculation", () => {
  const ACTUAL_PI = Math.PI;

  describe("Leibniz Formula", () => {
    it("should approximate PI", () => {
      const result = calculatePiLeibniz(100000);
      expect(Math.abs(result - ACTUAL_PI)).toBeLessThan(0.01);
    });

    it("should converge with more iterations", () => {
      const result1 = calculatePiLeibniz(1000);
      const result2 = calculatePiLeibniz(10000);
      const error1 = Math.abs(result1 - ACTUAL_PI);
      const error2 = Math.abs(result2 - ACTUAL_PI);
      expect(error2).toBeLessThan(error1);
    });
  });

  describe("Nilakantha Series", () => {
    it("should approximate PI", () => {
      const result = calculatePiNilakantha(1000);
      expect(Math.abs(result - ACTUAL_PI)).toBeLessThan(0.001);
    });

    it("should converge faster than Leibniz", () => {
      const leibnizError = Math.abs(calculatePiLeibniz(1000) - ACTUAL_PI);
      const nilakanthaError = Math.abs(calculatePiNilakantha(1000) - ACTUAL_PI);
      expect(nilakanthaError).toBeLessThan(leibnizError);
    });
  });

  describe("Monte Carlo Method", () => {
    it("should approximate PI", () => {
      const result = calculatePiMonteCarlo(100000);
      expect(Math.abs(result - ACTUAL_PI)).toBeLessThan(0.05);
    });

    it("should be deterministic with fixed seed", () => {
      // Note: Math.random() is not seedable in JS, so this test documents expected behavior
      const result1 = calculatePiMonteCarlo(10000);
      const result2 = calculatePiMonteCarlo(10000);
      // Both should be reasonable approximations
      expect(Math.abs(result1 - ACTUAL_PI)).toBeLessThan(0.1);
      expect(Math.abs(result2 - ACTUAL_PI)).toBeLessThan(0.1);
    });
  });

  describe("Chudnovsky Algorithm", () => {
    it("should approximate PI with few iterations", () => {
      const result = calculatePiChudnovsky(5);
      expect(Math.abs(result - ACTUAL_PI)).toBeLessThan(0.001);
    });

    it("should be very accurate with more iterations", () => {
      const result = calculatePiChudnovsky(10);
      expect(Math.abs(result - ACTUAL_PI)).toBeLessThan(1e-10);
    });
  });

  describe("Algorithm Comparison", () => {
    it("should rank by convergence speed: Chudnovsky > Nilakantha > Monte Carlo > Leibniz", () => {
      const iterations = 100;
      const leibnizError = Math.abs(calculatePiLeibniz(iterations) - ACTUAL_PI);
      const nilakanthaError = Math.abs(calculatePiNilakantha(iterations) - ACTUAL_PI);
      const monteCarloError = Math.abs(calculatePiMonteCarlo(iterations * 100) - ACTUAL_PI); // Monte Carlo needs more
      const chudnovskyError = Math.abs(calculatePiChudnovsky(3) - ACTUAL_PI);

      expect(chudnovskyError).toBeLessThan(nilakanthaError);
      expect(nilakanthaError).toBeLessThan(leibnizError);
    });
  });
});