import { describe, it, expect } from "vitest";
import { infiniteSequence, InfiniteSequence } from "../infiniteSequence";

describe("InfiniteSequence", () => {
  it("creates a sequence with seed values", async () => {
    const seq = infiniteSequence([1, 2], (a, b) => a + b);
    const first4 = await seq.collect(4);
    expect(first4).toEqual([1, 2, 3, 5]);
  });

  it("yields correct Fibonacci sequence", async () => {
    const fib = infiniteSequence([0, 1], (a, b) => a + b);
    const first10 = await fib.collect(10);
    expect(first10).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it("yields correct even numbers", async () => {
    const evens = infiniteSequence([0, 2], (_, n) => n + 2);
    const first5 = await evens.collect(5);
    expect(first5).toEqual([0, 2, 4, 6, 8]);
  });

  it("handles take(0) gracefully", async () => {
    const seq = infiniteSequence([1, 2], (a, b) => a + b);
    const result: number[] = [];
    for await (const item of seq.take(0)) {
      result.push(item);
    }
    expect(result).toEqual([]);
  });

  it("take() returns early when consumer breaks", async () => {
    const seq = infiniteSequence([1, 1], (a, b) => a + b);
    const result: number[] = [];
    for await (const item of seq.take(20)) {
      result.push(item);
      if (result.length >= 3) break;
    }
    expect(result).toEqual([1, 1, 2]);
  });

  it("throws if seed is empty", () => {
    expect(() => new InfiniteSequence([], (a, b) => a + b)).toThrow(
      "requires at least one seed",
    );
  });

  it("collect returns correct number of items", async () => {
    const seq = infiniteSequence([1, 2], (a, b) => a + b);
    const items = await seq.collect(6);
    expect(items).toHaveLength(6);
    expect(items).toEqual([1, 2, 3, 5, 8, 13]);
  });

  it("supports string sequences", async () => {
    const seq = infiniteSequence(["A", "B"], (a, b) => a + b);
    const first5 = await seq.collect(5);
    expect(first5).toEqual(["A", "B", "AB", "BAB", "ABBAB"]);
  });
});
