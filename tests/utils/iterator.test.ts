import { describe, it, expect } from "vitest";
import {
  infiniteSequence,
  fibonacci,
  take,
  filter,
  map,
} from "../../packages/utils/src/iterator";

describe("Infinite Sequence Iterator", () => {
  describe("infiniteSequence", () => {
    it("should generate numbers starting from 0", () => {
      const seq = infiniteSequence();
      const result = take(seq, 5);
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });

    it("should start from custom value", () => {
      const seq = infiniteSequence(10);
      const result = take(seq, 3);
      expect(result).toEqual([10, 11, 12]);
    });

    it("should use custom step", () => {
      const seq = infiniteSequence(0, 2);
      const result = take(seq, 5);
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });

    it("should respect maxValue", () => {
      const seq = infiniteSequence(0, 1, { maxValue: 3 });
      const result = take(seq, 10);
      expect(result).toEqual([0, 1, 2, 3]);
    });

    it("should respect maxIterations", () => {
      const seq = infiniteSequence(0, 1, { maxIterations: 3 });
      const result = take(seq, 10);
      expect(result).toEqual([0, 1, 2]);
    });
  });

  describe("fibonacci", () => {
    it("should generate fibonacci sequence", () => {
      const fib = fibonacci();
      const result = take(fib, 10);
      expect(result).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });
  });

  describe("take", () => {
    it("should take specified number of items", () => {
      const seq = infiniteSequence();
      const result = take(seq, 3);
      expect(result).toHaveLength(3);
    });

    it("should handle generator exhaustion", () => {
      function* finite() {
        yield 1;
        yield 2;
      }
      const result = take(finite(), 5);
      expect(result).toEqual([1, 2]);
    });
  });

  describe("filter", () => {
    it("should filter values", () => {
      const seq = infiniteSequence(0, 1, { maxIterations: 10 });
      const evens = filter(seq, (n) => n % 2 === 0);
      const result = take(evens, 5);
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });
  });

  describe("map", () => {
    it("should transform values", () => {
      const seq = infiniteSequence(0, 1, { maxIterations: 5 });
      const doubled = map(seq, (n) => n * 2);
      const result = take(doubled, 5);
      expect(result).toEqual([0, 2, 4, 6, 8]);
    });
  });
});
