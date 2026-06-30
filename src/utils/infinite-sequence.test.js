// Tests for infinite-sequence.js
// Uses Node.js built-in test runner (Node >=20 required)

const assert = require('node:assert');
const { test, describe } = require('node:test');
const { Sequence } = require('./infinite-sequence');

describe('Sequence.nats', () => {
  test('produces natural numbers starting from 0', () => {
    assert.deepStrictEqual(Sequence.nats().take(5), [0, 1, 2, 3, 4]);
  });

  test('can accumulate values', () => {
    const sum = Sequence.nats().take(10).reduce((a, b) => a + b, 0);
    assert.strictEqual(sum, 45);
  });
});

describe('Sequence.range', () => {
  test('produces an infinite range with start only', () => {
    assert.deepStrictEqual(Sequence.range(5).take(4), [5, 6, 7, 8]);
  });

  test('produces a finite range with start and end', () => {
    assert.deepStrictEqual(Sequence.range(0, 5).take(10), [0, 1, 2, 3, 4]);
  });

  test('produces a range with custom step', () => {
    assert.deepStrictEqual(Sequence.range(0, 10, 2).take(10), [0, 2, 4, 6, 8]);
  });

  test('produces a descending range', () => {
    assert.deepStrictEqual(Sequence.range(5, 0, -1).take(10), [5, 4, 3, 2, 1]);
  });

  test('throws for zero step', () => {
    assert.throws(() => Sequence.range(0, 10, 0), /step must not be zero/);
  });
});

describe('Sequence.fibonacci', () => {
  test('produces fibonacci numbers', () => {
    assert.deepStrictEqual(Sequence.fibonacci().take(10), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });
});

describe('Sequence.repeat', () => {
  test('repeats a value infinitely', () => {
    assert.deepStrictEqual(Sequence.repeat(42).take(5), [42, 42, 42, 42, 42]);
  });

  test('can repeat objects', () => {
    const obj = { a: 1 };
    const result = Sequence.repeat(obj).take(3);
    assert.strictEqual(result.length, 3);
    assert.strictEqual(result[0], obj);
    assert.strictEqual(result[1], obj);
  });
});

describe('Sequence.cycle', () => {
  test('cycles through an array infinitely', () => {
    assert.deepStrictEqual(Sequence.cycle([1, 2, 3]).take(7), [1, 2, 3, 1, 2, 3, 1]);
  });

  test('throws for empty array', () => {
    assert.throws(() => Sequence.cycle([]), /non-empty array/);
  });

  test('throws for non-array', () => {
    assert.throws(() => Sequence.cycle('abc'), /non-empty array/);
  });
});

describe('Sequence.from', () => {
  test('creates a sequence from an array', () => {
    assert.deepStrictEqual(Sequence.from([10, 20, 30]).take(5), [10, 20, 30]);
  });

  test('creates a sequence from a Set', () => {
    assert.deepStrictEqual(Sequence.from(new Set([1, 2, 3])).take(5), [1, 2, 3]);
  });
});

describe('Sequence methods', () => {
  test('map transforms values', () => {
    const squares = Sequence.nats().map(x => x * x).take(5);
    assert.deepStrictEqual(squares, [0, 1, 4, 9, 16]);
  });

  test('filter keeps matching values', () => {
    const evens = Sequence.nats().filter(x => x % 2 === 0).take(5);
    assert.deepStrictEqual(evens, [0, 2, 4, 6, 8]);
  });

  test('skip drops first n items', () => {
    const skipped = Sequence.nats().skip(5).take(5);
    assert.deepStrictEqual(skipped, [5, 6, 7, 8, 9]);
  });

  test('skip throws for negative n', () => {
    assert.throws(() => Sequence.nats().skip(-1), /non-negative/);
  });

  test('take throws for negative n', () => {
    assert.throws(() => Sequence.nats().take(-1), /non-negative/);
  });

  test('chained operations work correctly', () => {
    // First 5 even numbers greater than 10
    const result = Sequence.nats()
      .filter(x => x > 10)
      .filter(x => x % 2 === 0)
      .map(x => x * 10)
      .take(5);
    assert.deepStrictEqual(result, [120, 140, 160, 180, 200]);
  });
});

describe('Edge cases', () => {
  test('take(0) returns empty array', () => {
    assert.deepStrictEqual(Sequence.nats().take(0), []);
  });

  test('skip(0) returns all items', () => {
    assert.deepStrictEqual(Sequence.nats().skip(0).take(3), [0, 1, 2]);
  });

  test('range with end < start defaults to descending', () => {
    assert.deepStrictEqual(Sequence.range(5, 0).take(6), [5, 4, 3, 2, 1]);
  });
});
