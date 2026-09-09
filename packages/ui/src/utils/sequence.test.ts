import { describe, it, expect } from "vitest";
import { naturals, fibonacci, arithmetic, geometric, take } from "./sequence.js";

describe("take", () => {
  it("returns the first n values from a generator", () => {
    expect(take(naturals(), 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns fewer than n values when the source is exhausted", () => {
    expect(take([1, 2], 10)).toEqual([1, 2]);
  });
});

describe("naturals", () => {
  it("starts at 1 by default", () => {
    expect(take(naturals(), 1)).toEqual([1]);
  });

  it("produces correct first 5 values", () => {
    expect(take(naturals(), 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("respects a custom start value", () => {
    expect(take(naturals(10), 3)).toEqual([10, 11, 12]);
  });
});

describe("fibonacci", () => {
  it("produces the correct first 8 Fibonacci numbers", () => {
    expect(take(fibonacci(), 8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  it("starts with 0", () => {
    expect(take(fibonacci(), 1)).toEqual([0]);
  });
});

describe("arithmetic", () => {
  it("produces 0,1,2,3,4 with default args", () => {
    expect(take(arithmetic(), 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("respects custom start and step", () => {
    expect(take(arithmetic(10, 5), 4)).toEqual([10, 15, 20, 25]);
  });
});

describe("geometric", () => {
  it("produces powers of 2 with default args", () => {
    expect(take(geometric(), 5)).toEqual([1, 2, 4, 8, 16]);
  });

  it("respects custom start and ratio", () => {
    expect(take(geometric(3, 3), 4)).toEqual([3, 9, 27, 81]);
  });
});
