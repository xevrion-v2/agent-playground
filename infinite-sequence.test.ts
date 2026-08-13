import { describe, it, expect } from "vitest";
import { InfiniteSequence, naturalNumbers } from "./infinite-sequence";

describe("InfiniteSequence", () => {
  it("generates natural numbers", () => {
    const seq = naturalNumbers();
    expect(seq.next()).toBe(1);
    expect(seq.next()).toBe(2);
    expect(seq.next()).toBe(3);
  });

  it("take returns first n elements", () => {
    const seq = naturalNumbers();
    expect(seq.take(5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("works with custom transform", () => {
    const seq = new InfiniteSequence(2, (n) => n * 2);
    expect(seq.take(4)).toEqual([2, 4, 8, 16]);
  });

  it("is iterable", () => {
    const seq = naturalNumbers();
    let count = 0;
    for (const n of seq) {
      expect(n).toBeGreaterThan(0);
      if (++count >= 10) break;
    }
    expect(count).toBe(10);
  });
});
