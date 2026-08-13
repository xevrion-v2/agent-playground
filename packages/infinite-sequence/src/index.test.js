import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  fibonacciSequence,
  infiniteSequence,
  naturalNumbers,
  takeFromSequence
} from "./index.js";

describe("infiniteSequence", () => {
  it("lazily produces values from a recurrence", () => {
    const powersOfTwo = infiniteSequence({
      start: 1,
      next: (current) => current * 2
    });

    assert.deepEqual(takeFromSequence(powersOfTwo, 5), [1, 2, 4, 8, 16]);
  });

  it("supports bounded take consumption", () => {
    assert.deepEqual(naturalNumbers(3).take(4), [3, 4, 5, 6]);
  });

  it("does not consume values when count is zero", () => {
    let calls = 0;
    const sequence = infiniteSequence({
      start: 1,
      next: (current) => {
        calls += 1;
        return current + 1;
      }
    });

    assert.deepEqual(sequence.take(0), []);
    assert.equal(calls, 0);
  });

  it("validates take counts", () => {
    assert.throws(() => naturalNumbers().take(-1), RangeError);
    assert.throws(() => naturalNumbers().take(1.5), RangeError);
    assert.throws(() => naturalNumbers().take(Number.MAX_SAFE_INTEGER + 1), RangeError);
  });

  it("validates numeric sequence starts", () => {
    assert.throws(() => naturalNumbers(Number.NaN), TypeError);
    assert.throws(() => naturalNumbers(Infinity), TypeError);
  });

  it("can model Fibonacci pairs", () => {
    assert.deepEqual(fibonacciSequence().take(5), [
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 3],
      [3, 5]
    ]);
  });
});
