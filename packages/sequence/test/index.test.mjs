import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { InfiniteSequence } from "../src/index.js";

describe("InfiniteSequence", () => {
  it("naturalNumbers yields expected values", () => {
    assert.deepEqual(InfiniteSequence.naturalNumbers().take(5), [0, 1, 2, 3, 4]);
  });

  it("naturalNumbers starts from given offset", () => {
    assert.deepEqual(InfiniteSequence.naturalNumbers(5).take(3), [5, 6, 7]);
  });

  it("fibonacci yields correct sequence", () => {
    assert.deepEqual(InfiniteSequence.fibonacci().take(10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it("map transforms values", () => {
    const squares = InfiniteSequence.naturalNumbers().map(n => n * n);
    assert.deepEqual(squares.take(5), [0, 1, 4, 9, 16]);
  });

  it("filter selects matching values", () => {
    const evens = InfiniteSequence.naturalNumbers().filter(n => n % 2 === 0);
    assert.deepEqual(evens.take(5), [0, 2, 4, 6, 8]);
  });

  it("arithmetic sequence", () => {
    assert.deepEqual(InfiniteSequence.arithmetic(1, 3).take(4), [1, 4, 7, 10]);
  });

  it("geometric sequence", () => {
    assert.deepEqual(InfiniteSequence.geometric(2, 2).take(5), [2, 4, 8, 16, 32]);
  });
});
