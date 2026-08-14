import { describe, it, expect } from "vitest";
import {
  createInfiniteSequence,
  naturalNumbers,
  evenNumbers,
  fibonacciSequence,
  Sequence,
  seq,
  take,
} from "../sequence";

describe("createInfiniteSequence", () => {
  it("produces an infinite sequence of natural numbers", () => {
    const naturals = createInfiniteSequence((i) => i + 1);
    expect(naturals.next().value).toBe(1);
    expect(naturals.next().value).toBe(2);
    expect(naturals.next().value).toBe(3);
  });

  it("can be used with for...of with a break condition", () => {
    const squares = createInfiniteSequence((i) => i * i);
    const results: number[] = [];
    for (const val of squares) {
      if (val > 25) break;
      results.push(val);
    }
    expect(results).toEqual([0, 1, 4, 9, 16, 25]);
  });

  it("supports Symbol.iterator for spread (finite take)", () => {
    const seq = createInfiniteSequence((i) => i * 10);
    // Manual finite consumption
    const first4 = take(seq, 4);
    expect(first4).toEqual([0, 10, 20, 30]);
  });

  it("throws on non-function generator", () => {
    expect(() =>
      (createInfiniteSequence as unknown as (g: unknown) => void)(42),
    ).toThrow(TypeError);
    expect(() =>
      (createInfiniteSequence as unknown as (g: unknown) => void)("foo"),
    ).toThrow(TypeError);
  });
});

describe("take", () => {
  it("takes the first N elements from an iterable", () => {
    const naturals = createInfiniteSequence((i) => i + 1);
    expect(take(naturals, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns an empty array for count 0", () => {
    const naturals = createInfiniteSequence((i) => i + 1);
    expect(take(naturals, 0)).toEqual([]);
  });

  it("throws on negative count", () => {
    const naturals = createInfiniteSequence((i) => i + 1);
    expect(() => take(naturals, -1)).toThrow(RangeError);
  });

  it("handles finite iterables gracefully (defensive)", () => {
    const finite = [10, 20, 30];
    expect(take(finite, 10)).toEqual([10, 20, 30]);
  });
});

describe("naturalNumbers", () => {
  it("generates natural numbers starting from 1 by default", () => {
    expect(take(naturalNumbers(), 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("starts from a custom start value", () => {
    expect(take(naturalNumbers(10), 3)).toEqual([10, 11, 12]);
  });

  it("throws on non-integer start", () => {
    expect(() => naturalNumbers(1.5)).toThrow(RangeError);
  });

  it("throws on NaN start", () => {
    expect(() => naturalNumbers(NaN)).toThrow(RangeError);
  });

  it("works with 0 start", () => {
    expect(take(naturalNumbers(0), 3)).toEqual([0, 1, 2]);
  });
});

describe("evenNumbers", () => {
  it("generates even numbers starting from 0 by default", () => {
    expect(take(evenNumbers(), 5)).toEqual([0, 2, 4, 6, 8]);
  });

  it("starts from a custom even value", () => {
    expect(take(evenNumbers(10), 4)).toEqual([10, 12, 14, 16]);
  });

  it("throws on odd start", () => {
    expect(() => evenNumbers(1)).toThrow(RangeError);
  });

  it("throws on non-finite start", () => {
    expect(() => evenNumbers(Infinity)).toThrow(RangeError);
  });
});

describe("fibonacciSequence", () => {
  it("generates the classic Fibonacci sequence", () => {
    expect(take(fibonacciSequence(), 10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it("supports custom start values (Lucas-like)", () => {
    expect(take(fibonacciSequence(2, 1), 6)).toEqual([2, 1, 3, 4, 7, 11]);
  });

  it("handles [1, 1] start (alternate Fibonacci)", () => {
    expect(take(fibonacciSequence(1, 1), 6)).toEqual([1, 1, 2, 3, 5, 8]);
  });

  it("throws on non-finite start", () => {
    expect(() => fibonacciSequence(Infinity, 1)).toThrow(RangeError);
    expect(() => fibonacciSequence(0, NaN)).toThrow(RangeError);
  });
});

describe("Sequence class", () => {
  it("implements IterableIterator correctly", () => {
    const s = new Sequence(createInfiniteSequence((i) => i + 1));
    expect(s.next().value).toBe(1);
    expect(s.next().value).toBe(2);
    expect(s.next().value).toBe(3);
  });

  it("take() works as a method", () => {
    const s = new Sequence(createInfiniteSequence((i) => i + 1));
    expect(s.take(5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("map() transforms elements", () => {
    const s = new Sequence(createInfiniteSequence((i) => i + 1));
    const doubled = s.map((x) => x * 2);
    expect(doubled.take(5)).toEqual([2, 4, 6, 8, 10]);
  });

  it("filter() skips non-matching elements", () => {
    const s = new Sequence(createInfiniteSequence((i) => i + 1));
    const evens = s.filter((x) => x % 2 === 0);
    expect(evens.take(4)).toEqual([2, 4, 6, 8]);
  });

  it("skip() advances past elements", () => {
    const s = new Sequence(createInfiniteSequence((i) => i + 1));
    s.skip(3);
    expect(s.take(3)).toEqual([4, 5, 6]);
  });

  it("supports chaining: map -> filter -> take", () => {
    const naturals = new Sequence(createInfiniteSequence((i) => i + 1));
    const result = naturals
      .map((x) => x * 2)
      .filter((x) => x % 4 === 0)
      .take(5);
    expect(result).toEqual([4, 8, 12, 16, 20]);
  });
});

describe("seq() convenience factory", () => {
  it("creates a Sequence from a generator", () => {
    const naturals = seq((i) => i + 1);
    expect(naturals.take(3)).toEqual([1, 2, 3]);
  });

  it("supports chaining", () => {
    const result = seq((i) => i + 1)
      .filter((x) => x % 2 === 0)
      .map((x) => x * 10)
      .take(4);
    expect(result).toEqual([20, 40, 60, 80]);
  });
});
