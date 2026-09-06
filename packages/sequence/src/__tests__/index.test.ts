/**
 * Unit tests for @taskflow/sequence
 *
 * Run from monorepo root: npm test --workspace=@taskflow/sequence
 * Or directly: npx jest packages/sequence/src/__tests__/
 */

import {
  take,
  range,
  repeat,
  cycle,
  infiniteSequence,
  fibonacci,
  collect,
} from "../index";

// ---------------------------------------------------------------------------
// take
// ---------------------------------------------------------------------------

describe("take", () => {
  it("returns first n items from a finite array", () => {
    expect([...take([10, 20, 30, 40], 2)]).toEqual([10, 20]);
  });

  it("returns all items when n exceeds length", () => {
    expect([...take([1, 2, 3], 10)]).toEqual([1, 2, 3]);
  });

  it("returns nothing when n is 0", () => {
    expect([...take([1, 2, 3], 0)]).toEqual([]);
  });

  it("returns nothing for empty iterable", () => {
    expect([...take([], 5)]).toEqual([]);
  });

  it("safely limits an infinite sequence", () => {
    const first5 = [...take(range(0), 5)];
    expect(first5).toEqual([0, 1, 2, 3, 4]);
  });
});

// ---------------------------------------------------------------------------
// range
// ---------------------------------------------------------------------------

describe("range", () => {
  it("starts at 0 with step 1 by default", () => {
    expect([...take(range(), 5)]).toEqual([0, 1, 2, 3, 4]);
  });

  it("respects custom start", () => {
    expect([...take(range(10), 3)]).toEqual([10, 11, 12]);
  });

  it("respects custom step", () => {
    expect([...take(range(0, 3), 4)]).toEqual([0, 3, 6, 9]);
  });

  it("supports negative step", () => {
    expect([...take(range(5, -1), 5)]).toEqual([5, 4, 3, 2, 1]);
  });

  it("is infinite — take() required", () => {
    const iter = range(0);
    // Calling next manually proves it never ends
    for (let i = 0; i < 100; i++) {
      const { value, done } = iter.next();
      expect(value).toBe(i);
      expect(done).toBe(false);
    }
  });
});

// ---------------------------------------------------------------------------
// repeat
// ---------------------------------------------------------------------------

describe("repeat", () => {
  it("repeats a primitive value", () => {
    expect([...take(repeat("x"), 4)]).toEqual(["x", "x", "x", "x"]);
  });

  it("repeats an object reference", () => {
    const obj = { id: 1 };
    const result = [...take(repeat(obj), 3)];
    expect(result[0]).toBe(obj);
    expect(result[1]).toBe(obj);
    expect(result[2]).toBe(obj);
  });

  it("repeat(0) works with numbers", () => {
    expect([...take(repeat(0), 5)]).toEqual([0, 0, 0, 0, 0]);
  });
});

// ---------------------------------------------------------------------------
// cycle
// ---------------------------------------------------------------------------

describe("cycle", () => {
  it("cycles through items", () => {
    expect([...take(cycle(["a", "b", "c"]), 5)]).toEqual([
      "a", "b", "c", "a", "b",
    ]);
  });

  it("cycles a single item", () => {
    expect([...take(cycle(["only"]), 3)]).toEqual(["only", "only", "only"]);
  });

  it("empty array yields nothing", () => {
    expect([...take(cycle([]), 5)]).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// infiniteSequence
// ---------------------------------------------------------------------------

describe("infiniteSequence", () => {
  it("builds a sequence from a factory", () => {
    const squares = infiniteSequence((i) => (i + 1) ** 2);
    expect([...take(squares, 4)]).toEqual([1, 4, 9, 16]);
  });

  it("factory receives correct indices", () => {
    const indices: number[] = [];
    const seq = infiniteSequence((i) => {
      indices.push(i);
      return i;
    });
    [...take(seq, 5)];
    expect(indices).toEqual([0, 1, 2, 3, 4]);
  });

  it("works with string factory", () => {
    const labels = infiniteSequence((i) => `item-${i}`);
    expect([...take(labels, 3)]).toEqual(["item-0", "item-1", "item-2"]);
  });
});

// ---------------------------------------------------------------------------
// fibonacci
// ---------------------------------------------------------------------------

describe("fibonacci", () => {
  it("starts 0, 1 by default", () => {
    expect([...take(fibonacci(), 8)]).toEqual([
      0, 1, 1, 2, 3, 5, 8, 13,
    ]);
  });

  it("respects custom seeds", () => {
    expect([...take(fibonacci(2, 3), 5)]).toEqual([2, 3, 5, 8, 13]);
  });

  it("ten items sums correctly", () => {
    const fib10 = [...take(fibonacci(), 10)];
    expect(fib10[9]).toBe(34);
  });
});

// ---------------------------------------------------------------------------
// collect
// ---------------------------------------------------------------------------

describe("collect", () => {
  it("collects into an array", () => {
    expect(collect(take(range(10), 3))).toEqual([10, 11, 12]);
  });

  it("empty iterable yields empty array", () => {
    expect(collect([])).toEqual([]);
  });
});
