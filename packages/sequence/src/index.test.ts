import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { InfiniteSequence, naturalNumbers, fibonacci, arithmetic, geometric } from "./index.js";

describe("InfiniteSequence", () => {
  it("take n natural numbers", () => {
    assert.deepEqual(naturalNumbers.take(5), [1, 2, 3, 4, 5]);
  });

  it("take from arithmetic", () => {
    assert.deepEqual(arithmetic(0, 2).take(5), [0, 2, 4, 6, 8]);
  });

  it("take Fibonacci numbers", () => {
    const fib = fibonacci();
    // Skip first to get 1,1,2,3,5
    fib.next();
    assert.deepEqual(fib.take(5), [1, 1, 2, 3, 5]);
  });

  it("take from geometric", () => {
    assert.deepEqual(geometric(1, 2).take(5), [1, 2, 4, 8, 16]);
  });

  it("throw on negative take", () => {
    assert.throws(() => naturalNumbers.take(-1), RangeError);
  });

  it("empty take returns []", () => {
    assert.deepEqual(naturalNumbers.take(0), []);
  });
});
