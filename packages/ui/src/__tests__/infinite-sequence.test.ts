import { describe, it, expect } from "vitest";
import {
  take,
  naturalNumbers,
  fibonacci,
  repeat,
  generate,
} from "../infinite-sequence";

describe("take", () => {
  it("should collect first N elements", () => {
    expect(take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
  });

  it("should return empty array when N is 0", () => {
    expect(take([1, 2, 3], 0)).toEqual([]);
  });

  it("should return all elements when N exceeds length", () => {
    expect(take([1, 2], 5)).toEqual([1, 2]);
  });

  it("should work with infinite generators", () => {
    const nums = take(naturalNumbers(), 5);
    expect(nums).toEqual([0, 1, 2, 3, 4]);
  });
});

describe("naturalNumbers", () => {
  it("should start from 0 by default", () => {
    expect(take(naturalNumbers(), 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("should start from a custom value", () => {
    expect(take(naturalNumbers(10), 4)).toEqual([10, 11, 12, 13]);
  });
});

describe("fibonacci", () => {
  it("should generate correct sequence", () => {
    expect(take(fibonacci(), 10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });
});

describe("repeat", () => {
  it("should repeat the given value", () => {
    expect(take(repeat("x"), 3)).toEqual(["x", "x", "x"]);
  });

  it("should work with objects", () => {
    const obj = { a: 1 };
    const result = take(repeat(obj), 2);
    expect(result[0]).toBe(obj);
    expect(result[1]).toBe(obj);
  });
});

describe("generate", () => {
  it("should call factory each time", () => {
    let counter = 0;
    const gen = generate(() => counter++);
    expect(take(gen, 4)).toEqual([0, 1, 2, 3]);
  });

  it("should work with random values", () => {
    const gen = generate(() => Math.random());
    const vals = take(gen, 3);
    expect(vals).toHaveLength(3);
    vals.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    });
  });
});