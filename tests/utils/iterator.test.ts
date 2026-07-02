import { describe, it, expect } from "vitest";
import {
  fibonacci,
  arithmeticSequence,
  geometricSequence,
  take,
  find
} from "../../packages/utils/src/iterator";

describe("Infinite Sequence Iterator", () => {
  describe("Fibonacci", () => {
    it("should generate fibonacci sequence", () => {
      const fib = fibonacci();
      const first10 = take(fib, 10);
      expect(first10).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    it("should respect maxIterations", () => {
      const fib = fibonacci({ maxIterations: 5 });
      const result = take(fib, 10);
      expect(result.length).toBe(5);
    });

    it("should respect stopWhen condition", () => {
      const fib = fibonacci({ stopWhen: (value) => value > 10 });
      const result = take(fib, 100);
      expect(result.every(v => v <= 10)).toBe(true);
    });
  });

  describe("Arithmetic Sequence", () => {
    it("should generate arithmetic sequence", () => {
      const seq = arithmeticSequence(0, 2);
      const first5 = take(seq, 5);
      expect(first5).toEqual([0, 2, 4, 6, 8]);
    });

    it("should handle negative step", () => {
      const seq = arithmeticSequence(10, -3);
      const first5 = take(seq, 5);
      expect(first5).toEqual([10, 7, 4, 1, -2]);
    });
  });

  describe("Geometric Sequence", () => {
    it("should generate geometric sequence", () => {
      const seq = geometricSequence(1, 2);
      const first5 = take(seq, 5);
      expect(first5).toEqual([1, 2, 4, 8, 16]);
    });
  });

  describe("Utility Functions", () => {
    it("take should collect correct number of values", () => {
      const seq = arithmeticSequence(1, 1);
      const result = take(seq, 3);
      expect(result).toEqual([1, 2, 3]);
    });

    it("find should return first matching value", () => {
      const fib = fibonacci();
      const firstEven = find(fib, (v) => v % 2 === 0 && v > 0);
      expect(firstEven).toBe(2);
    });

    it("find should return undefined if no match", () => {
      const seq = arithmeticSequence(1, 2); // odd numbers only
      const firstEven = find(seq, (v) => v % 2 === 0);
      expect(firstEven).toBeUndefined();
    });
  });
});
