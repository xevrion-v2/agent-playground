import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { arithmetic, geometric, fibonacci, take } from "../sequence.ts";

describe("arithmetic sequence", () => {
  it("starts at 0 with step 1 by default", () => {
    assert.deepStrictEqual(take(arithmetic(), 5), [0, 1, 2, 3, 4]);
  });

  it("respects custom start and step", () => {
    assert.deepStrictEqual(take(arithmetic(10, 3), 4), [10, 13, 16, 19]);
  });

  it("handles negative step", () => {
    assert.deepStrictEqual(take(arithmetic(5, -1), 4), [5, 4, 3, 2]);
  });
});

describe("geometric sequence", () => {
  it("starts at 2 with ratio 2 by default", () => {
    assert.deepStrictEqual(take(geometric(), 5), [2, 4, 8, 16, 32]);
  });

  it("respects custom start and ratio", () => {
    assert.deepStrictEqual(take(geometric(1, 3), 5), [1, 3, 9, 27, 81]);
  });
});

describe("fibonacci sequence", () => {
  it("produces correct Fibonacci numbers", () => {
    assert.deepStrictEqual(take(fibonacci(), 10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it("starts with 0 and 1", () => {
    const fib = fibonacci();
    assert.strictEqual(fib.next().value, 0);
    assert.strictEqual(fib.next().value, 1);
  });
});

describe("take helper", () => {
  it("collects the requested number of values", () => {
    assert.deepStrictEqual(take(arithmetic(), 0), []);
    assert.deepStrictEqual(take(arithmetic(), 1), [0]);
  });

  it("throws for negative count", () => {
    assert.throws(() => take(arithmetic(), -1), RangeError);
  });
});