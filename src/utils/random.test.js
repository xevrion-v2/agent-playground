// Tests for random utility
// Uses Node.js built-in test runner

const assert = require('node:assert');
const { test, describe } = require('node:test');
const { randomString, randomInt, randomUUID, randomPick } = require('./random');

describe('randomString', () => {
  test('returns string of specified length', () => {
    assert.strictEqual(randomString(8).length, 8);
    assert.strictEqual(randomString(32).length, 32);
    assert.strictEqual(randomString(1).length, 1);
  });

  test('uses default length of 16', () => {
    assert.strictEqual(randomString().length, 16);
  });

  test('only contains alphanumeric characters', () => {
    const s = randomString(1000);
    assert.ok(/^[A-Za-z0-9]+$/.test(s));
  });

  test('produces different values on successive calls', () => {
    const s1 = randomString(10);
    const s2 = randomString(10);
    assert.notStrictEqual(s1, s2);
  });

  test('throws for zero length', () => {
    assert.throws(() => randomString(0), /positive/);
  });

  test('throws for negative length', () => {
    assert.throws(() => randomString(-5), /positive/);
  });

  test('throws for non-number input', () => {
    assert.throws(() => randomString('abc'), /positive/);
  });
});

describe('randomInt', () => {
  test('returns integer within range', () => {
    for (let i = 0; i < 100; i++) {
      const n = randomInt(1, 10);
      assert.ok(n >= 1 && n <= 10);
      assert.strictEqual(Number.isInteger(n), true);
    }
  });

  test('returns min value when min equals max', () => {
    assert.strictEqual(randomInt(5, 5), 5);
  });

  test('handles negative ranges', () => {
    const n = randomInt(-10, -1);
    assert.ok(n >= -10 && n <= -1);
  });

  test('throws for NaN input', () => {
    assert.throws(() => randomInt(NaN, 10), /finite/);
  });

  test('throws when min > max', () => {
    assert.throws(() => randomInt(10, 5), /min must be/);
  });

  test('throws for non-finite numbers', () => {
    assert.throws(() => randomInt(1, Infinity), /finite/);
  });
});

describe('randomUUID', () => {
  test('returns string in UUID v4 format', () => {
    const uuid = randomUUID();
    assert.ok(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(uuid));
  });

  test('returns 36 characters', () => {
    assert.strictEqual(randomUUID().length, 36);
  });

  test('produces unique values', () => {
    const u1 = randomUUID();
    const u2 = randomUUID();
    assert.notStrictEqual(u1, u2);
  });
});

describe('randomPick', () => {
  test('returns a random element from the array', () => {
    const arr = ['a', 'b', 'c'];
    const picked = randomPick(arr);
    assert.ok(arr.includes(picked));
  });

  test('returns null for empty array', () => {
    assert.strictEqual(randomPick([]), null);
  });

  test('returns the only element for single-element array', () => {
    assert.strictEqual(randomPick([42]), 42);
  });

  test('does not mutate the original array', () => {
    const arr = [1, 2, 3];
    const original = [...arr];
    randomPick(arr);
    assert.deepStrictEqual(arr, original);
  });

  test('throws for non-array input', () => {
    assert.throws(() => randomPick('abc'), /must be an array/);
    assert.throws(() => randomPick(null), /must be an array/);
    assert.throws(() => randomPick(undefined), /must be an array/);
  });
});
