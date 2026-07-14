const { describe, it } = require('node:test');
const assert = require('node:assert');
const { slugify } = require('./slugify');

describe('slugify', () => {
  it('converts spaces to hyphens', () => {
    assert.strictEqual(slugify('hello world'), 'hello-world');
  });

  it('converts to lowercase', () => {
    assert.strictEqual(slugify('Hello World'), 'hello-world');
  });

  it('removes special characters', () => {
    assert.strictEqual(slugify('hello! world@ #test'), 'hello-world-test');
  });

  it('handles null input', () => {
    assert.strictEqual(slugify(null), '');
  });

  it('handles undefined input', () => {
    assert.strictEqual(slugify(undefined), '');
  });

  it('handles empty string', () => {
    assert.strictEqual(slugify(''), '');
  });

  it('handles string with only whitespace', () => {
    assert.strictEqual(slugify('   '), '');
  });

  it('keeps alphanumeric characters', () => {
    assert.strictEqual(slugify('Hello123World'), 'hello123world');
  });

  it('keeps underscores', () => {
    assert.strictEqual(slugify('hello_world'), 'hello_world');
  });

  it('keeps existing hyphens', () => {
    assert.strictEqual(slugify('hello-world'), 'hello-world');
  });

  it('collapses multiple spaces into single hyphen', () => {
    assert.strictEqual(slugify('hello   world'), 'hello-world');
  });

  it('trims leading and trailing hyphens', () => {
    assert.strictEqual(slugify('-hello-'), 'hello');
  });

  it('handles mixed special chars and spaces', () => {
    assert.strictEqual(slugify('  My Favorite !! Recipe #1  '), 'my-favorite-recipe-1');
  });

  it('handles already slugified input', () => {
    assert.strictEqual(slugify('already-slugified'), 'already-slugified');
  });

  it('handles numbers only', () => {
    assert.strictEqual(slugify('12345'), '12345');
  });
});
