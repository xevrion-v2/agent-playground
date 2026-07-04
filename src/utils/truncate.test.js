// Tests for truncate utility
// Uses Node.js built-in test runner

const assert = require('node:assert');
const { test, describe } = require('node:test');
const { truncate } = require('./truncate');

describe('truncate', () => {
  test('returns full string when shorter than maxLength', () => {
    assert.strictEqual(truncate('Hello world', 20), 'Hello world');
  });

  test('truncates and appends ellipsis when string exceeds maxLength', () => {
    assert.strictEqual(truncate('Hello world', 5), 'He...');
  });

  test('returns string unchanged when length equals maxLength', () => {
    assert.strictEqual(truncate('Hello', 5), 'Hello');
  });

  test('uses default maxLength of 100', () => {
    const long = 'a'.repeat(150);
    const result = truncate(long);
    assert.strictEqual(result.length, 100); // 100 chars total (97 chars + '...')
    assert.ok(result.endsWith('...'));
  });

  test('handles custom ellipsis', () => {
    assert.strictEqual(truncate('Hello world', 8, { ellipsis: '---' }), 'Hello---');
  });

  test('handles empty ellipsis', () => {
    assert.strictEqual(truncate('Hello world', 5, { ellipsis: '' }), 'Hello');
  });

  test('returns empty string for null input', () => {
    assert.strictEqual(truncate(null), '');
  });

  test('returns empty string for undefined input', () => {
    assert.strictEqual(truncate(undefined), '');
  });

  test('returns empty string for empty string input', () => {
    assert.strictEqual(truncate('', 10), '');
  });

  test('returns empty string for zero maxLength', () => {
    assert.strictEqual(truncate('Hello', 0), '');
  });

  test('throws for negative maxLength', () => {
    assert.throws(() => truncate('Hello', -1), /non-negative/);
  });

  test('throws for NaN maxLength', () => {
    assert.throws(() => truncate('Hello', NaN), /non-negative/);
  });

  test('throws for Infinity maxLength', () => {
    assert.throws(() => truncate('Hello', Infinity), /non-negative/);
  });

  test('handles very long strings', () => {
    const long = 'x'.repeat(10000);
    const result = truncate(long, 10);
    assert.strictEqual(result, 'xxxxxxx...');
    assert.strictEqual(result.length, 10);
  });

  test('handles custom maxLength with no truncation needed', () => {
    assert.strictEqual(truncate('Hi', 50), 'Hi');
  });

  test('handles non-string object gracefully', () => {
    assert.strictEqual(truncate({}), '');
    assert.strictEqual(truncate([]), '');
    assert.strictEqual(truncate(42), '');
    assert.strictEqual(truncate(true), '');
  });

  test('handles unicode characters', () => {
    assert.strictEqual(truncate('浣犲ソ涓栫晫', 3, { ellipsis: '..' }), '浣?.');
  });

  test('handles maxLength shorter than ellipsis', () => {
    assert.strictEqual(truncate('Hello world', 2), '..');
    assert.strictEqual(truncate('Hello world', 1), '.');
    assert.strictEqual(truncate('Hello world', 0), '');
  });
});
