// Tests for array utilities
const assert = require('node:assert');
const { test, describe } = require('node:test');
const { chunk, unique, shuffle, groupBy } = require('./array-utils');

describe('chunk', () => {
  test('splits array into chunks of specified size', () => {
    assert.deepStrictEqual(chunk([1,2,3,4,5], 2), [[1,2], [3,4], [5]]);
  });
  test('handles exact division', () => {
    assert.deepStrictEqual(chunk([1,2,3,4], 2), [[1,2], [3,4]]);
  });
  test('handles single element chunks', () => {
    assert.deepStrictEqual(chunk([1,2,3], 1), [[1], [2], [3]]);
  });
  test('handles empty array', () => {
    assert.deepStrictEqual(chunk([], 3), []);
  });
  test('throws for non-array', () => {
    assert.throws(() => chunk('abc', 2), /must be an array/);
  });
  test('throws for invalid size', () => {
    assert.throws(() => chunk([1,2], 0), /positive/);
  });
});

describe('unique', () => {
  test('removes duplicate numbers', () => {
    assert.deepStrictEqual(unique([1,2,2,3,3,3]), [1,2,3]);
  });
  test('removes duplicate strings', () => {
    assert.deepStrictEqual(unique(['a','b','a','c']), ['a','b','c']);
  });
  test('returns same array when no duplicates', () => {
    assert.deepStrictEqual(unique([1,2,3]), [1,2,3]);
  });
  test('handles empty array', () => {
    assert.deepStrictEqual(unique([]), []);
  });
  test('throws for non-array', () => {
    assert.throws(() => unique(null), /must be an array/);
  });
});

describe('shuffle', () => {
  test('returns array of same length', () => {
    const arr = [1,2,3,4,5];
    assert.strictEqual(shuffle(arr).length, 5);
  });
  test('contains all original elements', () => {
    const arr = [1,2,3,4,5];
    assert.deepStrictEqual(shuffle(arr).sort(), arr);
  });
  test('does not mutate original array', () => {
    const arr = [1,2,3,4,5];
    const original = [...arr];
    shuffle(arr);
    assert.deepStrictEqual(arr, original);
  });
  test('throws for non-array', () => {
    assert.throws(() => shuffle(42), /must be an array/);
  });
});

describe('groupBy', () => {
  test('groups by string length', () => {
    const result = groupBy(['one','two','three','four'], s => s.length.toString());
    assert.deepStrictEqual(result['3'], ['one','two']);
    assert.deepStrictEqual(result['5'], ['three']);
    assert.deepStrictEqual(result['4'], ['four']);
  });
  test('groups numbers by even/odd', () => {
    const result = groupBy([1,2,3,4,5], n => n % 2 === 0 ? 'even' : 'odd');
    assert.deepStrictEqual(result['odd'], [1,3,5]);
    assert.deepStrictEqual(result['even'], [2,4]);
  });
  test('handles empty array', () => {
    assert.deepStrictEqual(groupBy([], x => x), {});
  });
  test('throws for non-array', () => {
    assert.throws(() => groupBy('abc', x => x), /must be an array/);
  });
  test('throws for non-function', () => {
    assert.throws(() => groupBy([1,2], null), /must be a function/);
  });
});
