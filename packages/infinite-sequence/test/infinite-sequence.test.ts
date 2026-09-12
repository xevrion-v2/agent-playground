import assert from "node:assert/strict";
import test from "node:test";

import { InfiniteSequence, infiniteSequence, take } from "../src/index.js";

test("generates a lazy recurrence without advancing past the limit", () => {
  const stepIndexes: number[] = [];
  const evens = infiniteSequence(0, (value, index) => {
    stepIndexes.push(index);
    return value + 2;
  });

  assert.deepEqual(Array.from(evens.take(5)), [0, 2, 4, 6, 8]);
  assert.deepEqual(stepIndexes, [0, 1, 2, 3]);
});

test("creates an independent iterator for every traversal", () => {
  const naturals = infiniteSequence(1, (value) => value + 1);
  assert.deepEqual(Array.from(naturals.take(3)), [1, 2, 3]);
  assert.deepEqual(Array.from(naturals.take(3)), [1, 2, 3]);
});

test("supports stateful values such as Fibonacci pairs", () => {
  const fibonacciStates = infiniteSequence(
    [0, 1] as const,
    ([current, next]) => [next, current + next] as const,
  );
  const values: number[] = [];

  for (const [current] of fibonacciStates.take(8)) {
    values.push(current);
  }

  assert.deepEqual(values, [0, 1, 1, 2, 3, 5, 8, 13]);
});

test("take(0) does not open the source iterator", () => {
  let opens = 0;
  const source: Iterable<number> = {
    *[Symbol.iterator]() {
      opens += 1;
      yield 1;
    },
  };

  assert.deepEqual(Array.from(take(source, 0)), []);
  assert.equal(opens, 0);
});

test("take stops cleanly when a finite source ends first", () => {
  assert.deepEqual(Array.from(take([1, 2], 10)), [1, 2]);
});

test("take closes the source at its limit and on consumer cancellation", () => {
  let closes = 0;
  const source = new InfiniteSequence(function* trackedIterator() {
    try {
      let value = 0;
      while (true) {
        yield value;
        value += 1;
      }
    } finally {
      closes += 1;
    }
  });

  assert.deepEqual(Array.from(take(source, 3)), [0, 1, 2]);
  assert.equal(closes, 1);

  for (const value of take(source, 10)) {
    assert.equal(value, 0);
    break;
  }

  assert.equal(closes, 2);
});

test("rejects unsafe limits before iteration", () => {
  const source = infiniteSequence(0, (value) => value + 1);

  for (const count of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.throws(
      () => take(source, count),
      new RangeError("count must be a non-negative safe integer"),
    );
  }

  assert.throws(
    () => take(source, Number.MAX_SAFE_INTEGER + 1),
    new RangeError("count must be a non-negative safe integer"),
  );
});

test("validates factories and iterable inputs", () => {
  assert.throws(
    () => new InfiniteSequence<number>(null as never),
    new TypeError("iteratorFactory must be a function"),
  );
  assert.throws(
    () => infiniteSequence(0, null as never),
    new TypeError("step must be a function"),
  );
  assert.throws(
    () => take(null as never, 1),
    new TypeError("source must be iterable"),
  );

  const invalid = new InfiniteSequence<number>(() => null as never);
  assert.throws(
    () => invalid[Symbol.iterator](),
    new TypeError("iteratorFactory must return an iterator"),
  );
});
