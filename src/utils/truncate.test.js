'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');

const { truncate } = require('./truncate');

test('returns an empty string for nullish and empty values', () => {
  assert.equal(truncate(null), '');
  assert.equal(truncate(undefined), '');
  assert.equal(truncate(''), '');
});

test('returns strings within maxLength unchanged', () => {
  assert.equal(truncate('short', { maxLength: 5 }), 'short');
  assert.equal(truncate('short', { maxLength: 10 }), 'short');
});

test('truncates long strings with the default ellipsis', () => {
  assert.equal(truncate('abcdefghijklmnopqrstuvwxyz', { maxLength: 10 }), 'abcdefg...');
});

test('supports custom maxLength and ellipsis options', () => {
  assert.equal(truncate('hello world', { maxLength: 8, ellipsis: '…' }), 'hello w…');
  assert.equal(truncate('hello world', { maxLength: 8, ellipsis: '--' }), 'hello --');
});

test('coerces non-string input to strings before truncating', () => {
  assert.equal(truncate(1234567890, { maxLength: 6 }), '123...');
  assert.equal(truncate(false, { maxLength: 4, ellipsis: '!' }), 'fal!');
});

test('handles short or empty ellipsis values safely', () => {
  assert.equal(truncate('abcdef', { maxLength: 3, ellipsis: '----' }), '---');
  assert.equal(truncate('abcdef', { maxLength: 3, ellipsis: '' }), 'abc');
  assert.equal(truncate('abcdef', { maxLength: 3, ellipsis: null }), 'abc');
});

test('handles invalid and zero maxLength values gracefully', () => {
  assert.equal(truncate('abcdef', { maxLength: 0 }), '');
  assert.equal(truncate('abcdef', { maxLength: -1 }), 'abcdef');
  assert.equal(truncate('abcdef', { maxLength: 'not-a-number' }), 'abcdef');
});
