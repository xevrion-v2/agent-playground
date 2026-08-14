// Tests for slugify utility
// Uses Node.js built-in test runner

const assert = require('node:assert');
const { test, describe } = require('node:test');
const { slugify } = require('./slugify');

describe('slugify', () => {
  test('converts basic string to slug', () => {
    assert.strictEqual(slugify('Hello World'), 'hello-world');
  });

  test('converts to lowercase', () => {
    assert.strictEqual(slugify('HELLO World'), 'hello-world');
  });

  test('replaces multiple spaces with single hyphen', () => {
    assert.strictEqual(slugify('Hello   World'), 'hello-world');
  });

  test('trims leading and trailing spaces', () => {
    assert.strictEqual(slugify('  Hello World  '), 'hello-world');
  });

  test('replaces underscores with hyphens', () => {
    assert.strictEqual(slugify('hello_world'), 'hello-world');
  });

  test('removes special characters', () => {
    assert.strictEqual(slugify('Hello! World? How are you?'), 'hello-world-how-are-you');
  });

  test('handles string with only special characters', () => {
    assert.strictEqual(slugify('!!! ???'), '');
  });

  test('handles empty string', () => {
    assert.strictEqual(slugify(''), '');
  });

  test('handles null input', () => {
    assert.strictEqual(slugify(null), '');
  });

  test('handles undefined input', () => {
    assert.strictEqual(slugify(undefined), '');
  });

  test('handles non-string input', () => {
    assert.strictEqual(slugify(123), '');
    assert.strictEqual(slugify({}), '');
    assert.strictEqual(slugify([]), '');
    assert.strictEqual(slugify(true), '');
  });

  test('handles string with hyphens', () => {
    assert.strictEqual(slugify('hello-world'), 'hello-world');
  });

  test('collapses multiple hyphens', () => {
    assert.strictEqual(slugify('hello---world'), 'hello-world');
  });

  test('trims leading hyphens', () => {
    assert.strictEqual(slugify('--hello-world'), 'hello-world');
  });

  test('trims trailing hyphens', () => {
    assert.strictEqual(slugify('hello-world--'), 'hello-world');
  });

  test('ignores non-latin characters', () => {
    assert.strictEqual(slugify('浣犲ソ World'), 'world');
  });

  test('handles numbers', () => {
    assert.strictEqual(slugify('Hello 2 World'), 'hello-2-world');
  });

  test('handles single word', () => {
    assert.strictEqual(slugify('Hello'), 'hello');
  });
});
