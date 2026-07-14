const { describe, it } = require('node:test');
const assert = require('node:assert');
const { randomString, randomInt, randomUUID, randomPick } = require('./random');

describe('randomString', () => {
  it('returns a string of the correct length', () => {
    assert.strictEqual(randomString(10).length, 10);
  });

  it('returns only alphanumeric characters', () => {
    assert.match(randomString(100), /^[A-Za-z0-9]+$/);
  });

  it('throws on zero length', () => {
    assert.throws(() => randomString(0), TypeError);
  });

  it('throws on negative length', () => {
    assert.throws(() => randomString(-1), TypeError);
  });

  it('throws on non-integer length', () => {
    assert.throws(() => randomString(1.5), TypeError);
  });
});

describe('randomInt', () => {
  it('returns an integer in range', () => {
    const val = randomInt(1, 10);
    assert.ok(Number.isInteger(val));
    assert.ok(val >= 1 && val <= 10);
  });

  it('handles min === max', () => {
    assert.strictEqual(randomInt(5, 5), 5);
  });

  it('throws when min > max', () => {
    assert.throws(() => randomInt(10, 1), RangeError);
  });

  it('throws on non-integer min', () => {
    assert.throws(() => randomInt(1.5, 10), TypeError);
  });
});

describe('randomUUID', () => {
  it('returns a valid UUID format', () => {
    const uuid = randomUUID();
    assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  it('generates unique values', () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(randomUUID());
    }
    assert.strictEqual(ids.size, 100);
  });
});

describe('randomPick', () => {
  it('returns an element from the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const picked = randomPick(arr);
    assert.ok(arr.includes(picked));
  });

  it('throws on empty array', () => {
    assert.throws(() => randomPick([]), RangeError);
  });

  it('throws on non-array', () => {
    assert.throws(() => randomPick(null), TypeError);
  });
});
