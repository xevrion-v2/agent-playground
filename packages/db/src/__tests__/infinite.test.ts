import { describe, it, expect } from "vitest";
import { InfiniteSequence } from "../infinite";

describe("InfiniteSequence.naturals", () => {
  it("generates sequential numbers", () => {
    const seq = InfiniteSequence.naturals(1);
    expect(seq.take(5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("starts from the given seed", () => {
    const seq = InfiniteSequence.naturals(100);
    expect(seq.take(3)).toEqual([100, 101, 102]);
  });
});

describe("InfiniteSequence.geometric", () => {
  it("multiplies by the factor", () => {
    const seq = InfiniteSequence.geometric(2, 3);
    expect(seq.take(4)).toEqual([6, 18, 54, 162]);
  });
});

describe("InfiniteSequence.cycle", () => {
  it("loops through provided values", () => {
    const seq = InfiniteSequence.cycle(["a", "b", "c"]);
    expect(seq.take(5)).toEqual(["a", "b", "c", "a", "b"]);
  });

  it("throws on empty array", () => {
    expect(() => InfiniteSequence.cycle([])).toThrow();
  });
});

describe("InfiniteSequence safety", () => {
  it("peek returns current without advancing", () => {
    const seq = InfiniteSequence.naturals(0);
    expect(seq.peek()).toBe(0);
    seq.next();
    expect(seq.peek()).toBe(1);
  });

  it("throws on negative take", () => {
    const seq = InfiniteSequence.naturals(0);
    expect(() => seq.take(-1)).toThrow();
  });

  it("throws on take exceeding MAX_TAKE", () => {
    const seq = InfiniteSequence.naturals(0);
    expect(() => seq.take(InfiniteSequence.MAX_TAKE + 1)).toThrow();
  });

  it("tracks iteration count", () => {
    const seq = InfiniteSequence.naturals(0);
    seq.take(5);
    expect(seq.iterations).toBe(5);
  });
});
