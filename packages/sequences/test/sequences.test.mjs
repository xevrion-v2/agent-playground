import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  fibonacci,
  infiniteSequence,
  mapSequence,
  naturals,
  take
} from "../src/index.mjs";

describe("infinite sequence utilities", () => {
  it("safely takes a bounded number of natural numbers", () => {
    assert.deepEqual(take(naturals(1), 5), [1, 2, 3, 4, 5]);
  });

  it("generates Fibonacci values lazily", () => {
    assert.deepEqual(take(fibonacci(), 8), [0, 1, 1, 2, 3, 5, 8, 13]);
  });

  it("supports custom recurrence rules", () => {
    const powersOfTwo = infiniteSequence(1, value => value * 2);

    assert.deepEqual(take(powersOfTwo, 6), [1, 2, 4, 8, 16, 32]);
  });

  it("maps infinite iterables without eager consumption", () => {
    let calls = 0;
    const doubled = mapSequence(naturals(1), value => {
      calls += 1;
      return value * 2;
    });

    assert.deepEqual(take(doubled, 4), [2, 4, 6, 8]);
    assert.equal(calls, 4);
  });

  it("validates bounded consumption and iterator inputs", () => {
    assert.throws(() => take(naturals(), -1), RangeError);
    assert.throws(() => take(naturals(), 1.5), TypeError);
    assert.throws(() => take(null, 1), TypeError);
    assert.throws(() => infiniteSequence(0, null), TypeError);
    assert.throws(() => mapSequence(naturals(), null), TypeError);
  });

  it("can intentionally request zero values", () => {
    assert.deepEqual(take(naturals(), 0), []);
  });
});
