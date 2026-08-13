import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { countFrom, generate, repeat, take } from "./infiniteSequence.js";

describe("infinite sequence utilities", () => {
  it("takes a bounded number of values from an infinite counter", () => {
    assert.deepEqual(take(countFrom(1), 5), [1, 2, 3, 4, 5]);
  });

  it("supports custom counter steps", () => {
    assert.deepEqual(take(countFrom(2, 3), 4), [2, 5, 8, 11]);
  });

  it("repeats a value without materializing the whole sequence", () => {
    assert.deepEqual(take(repeat("loading"), 3), [
      "loading",
      "loading",
      "loading"
    ]);
  });

  it("generates values from the zero-based index", () => {
    assert.deepEqual(take(generate((index) => index * index), 5), [
      0,
      1,
      4,
      9,
      16
    ]);
  });

  it("returns an empty array for a zero count", () => {
    assert.deepEqual(take(countFrom(), 0), []);
  });

  it("does not advance the iterator beyond the requested count", () => {
    let nextCalls = 0;

    function* trackNextCalls() {
      while (true) {
        nextCalls += 1;
        yield nextCalls;
      }
    }

    assert.deepEqual(take(trackNextCalls(), 0), []);
    assert.equal(nextCalls, 0);

    assert.deepEqual(take(trackNextCalls(), 2), [1, 2]);
    assert.equal(nextCalls, 2);
  });

  it("rejects negative and unsafe counts", () => {
    assert.throws(() => take(countFrom(), -1), RangeError);
    assert.throws(() => take(countFrom(), Number.MAX_SAFE_INTEGER + 1), RangeError);
  });
});
