import assert from "node:assert/strict";
import test from "node:test";

import {
  fibonacciSequence,
  infiniteSequence,
  naturalNumbers,
  takeFromSequence
} from "./index.ts";

test("takes a bounded slice from natural numbers", () => {
  assert.deepEqual(takeFromSequence(naturalNumbers(), 6), [0, 1, 2, 3, 4, 5]);
  assert.deepEqual(takeFromSequence(naturalNumbers(3), 4), [3, 4, 5, 6]);
});

test("takes a bounded slice from Fibonacci numbers", () => {
  assert.deepEqual(takeFromSequence(fibonacciSequence(), 8), [
    0,
    1,
    1,
    2,
    3,
    5,
    8,
    13
  ]);
});

test("supports custom recurrence sequences", () => {
  const powersOfTwo = infiniteSequence(1, (value) => value * 2);

  assert.deepEqual(takeFromSequence(powersOfTwo, 5), [1, 2, 4, 8, 16]);
});

test("allows zero values to be safely consumed", () => {
  assert.deepEqual(takeFromSequence(naturalNumbers(), 0), []);
});

test("rejects unsafe take counts", () => {
  assert.throws(() => takeFromSequence(naturalNumbers(), -1), /non-negative integer/);
  assert.throws(() => takeFromSequence(naturalNumbers(), 1.5), /non-negative integer/);
});
