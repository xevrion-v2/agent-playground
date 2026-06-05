import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  sequence, take, takeWhile, collect,
  naturals, arithmetic, fibonacci, recurrence,
} from "../src/index.ts";

describe("sequence()", () => {
  it("produces infinite sequence from seed and step", () => {
    const s = sequence(0, (p) => p + 2);
    assert.deepStrictEqual(collect(take(s, 5)), [0, 2, 4, 6, 8]);
  });
});

describe("take()", () => {
  it("returns exactly n items", () => {
    assert.deepStrictEqual(collect(take(naturals(), 3)), [0, 1, 2]);
  });

  it("returns empty for n=0", () => {
    assert.deepStrictEqual(collect(take(naturals(), 0)), []);
  });
});

describe("takeWhile()", () => {
  it("stops when predicate fails", () => {
    assert.deepStrictEqual(
      collect(takeWhile(naturals(), (v) => v < 5)),
      [0, 1, 2, 3, 4]
    );
  });
});

describe("collect()", () => {
  it("collects up to n items", () => {
    assert.deepStrictEqual(collect(naturals(), 4), [0, 1, 2, 3]);
  });
});

describe("naturals()", () => {
  it("starts from 0 by default", () => {
    assert.deepStrictEqual(collect(take(naturals(), 4)), [0, 1, 2, 3]);
  });

  it("accepts custom start", () => {
    assert.deepStrictEqual(collect(take(naturals(10), 3)), [10, 11, 12]);
  });
});

describe("arithmetic()", () => {
  it("generates arithmetic sequence", () => {
    assert.deepStrictEqual(collect(take(arithmetic(1, 3), 5)), [1, 4, 7, 10, 13]);
  });
});

describe("fibonacci()", () => {
  it("produces correct Fibonacci numbers", () => {
    assert.deepStrictEqual(collect(take(fibonacci(), 10)), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });
});

describe("recurrence()", () => {
  it("works with tribonacci (sum of last 3)", () => {
    const trib = recurrence([0, 0, 1], (p) => p[0] + p[1] + p[2]);
    assert.deepStrictEqual(collect(take(trib, 8)), [0, 0, 1, 1, 2, 4, 7, 13]);
  });
});
