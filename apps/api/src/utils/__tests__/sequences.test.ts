import { describe, it, expect } from "vitest";
import { naturals, fibonacci, geometric, take } from "../sequences";

describe("Infinite Sequence Iterators", () => {
  describe("naturals", () => {
    it("should start from 0 by default", () => {
      const gen = naturals();
      expect(gen.next().value).toBe(0);
      expect(gen.next().value).toBe(1);
      expect(gen.next().value).toBe(2);
    });

    it("should start from custom value", () => {
      const gen = naturals(10);
      expect(gen.next().value).toBe(10);
      expect(gen.next().value).toBe(11);
    });
  });

  describe("fibonacci", () => {
    it("should produce correct Fibonacci sequence", () => {
      const gen = fibonacci();
      const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
      for (const val of expected) {
        expect(gen.next().value).toBe(val);
      }
    });
  });

  describe("geometric", () => {
    it("should produce powers of 2", () => {
      const gen = geometric(1, 2);
      expect(gen.next().value).toBe(1);
      expect(gen.next().value).toBe(2);
      expect(gen.next().value).toBe(4);
      expect(gen.next().value).toBe(8);
    });
  });

  describe("take", () => {
    it("should collect finite values from infinite iterator", () => {
      const result = take(naturals(1), 5);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should work with fibonacci", () => {
      const result = take(fibonacci(), 7);
      expect(result).toEqual([0, 1, 1, 2, 3, 5, 8]);
    });

    it("should handle count of 0", () => {
      const result = take(naturals(), 0);
      expect(result).toEqual([]);
    });
  });
});
