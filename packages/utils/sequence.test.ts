import { describe, it, expect } from "vitest";
import { range, take, skip, map, toArray } from "./sequence";

describe("range", () => {
  it("generates infinite sequence from 0", () => {
    const result = toArray(take(range(), 5));
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  it("respects start and step", () => {
    const result = toArray(take(range(10, 5), 3));
    expect(result).toEqual([10, 15, 20]);
  });
});

describe("take", () => {
  it("limits output", () => {
    const result = toArray(take(range(), 3));
    expect(result).toEqual([0, 1, 2]);
  });
});

describe("skip", () => {
  it("skips first n values", () => {
    const result = toArray(take(skip(range(), 5), 3));
    expect(result).toEqual([5, 6, 7]);
  });
});

describe("map", () => {
  it("transforms values", () => {
    const result = toArray(take(map(range(1), (n) => n * 2), 3));
    expect(result).toEqual([2, 4, 6]);
  });
});
