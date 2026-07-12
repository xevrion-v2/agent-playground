const assert = require('node:assert/strict');
const test = require('node:test');

const { randomInt, randomPick, randomString, randomUUID } = require('./random');

test('randomString defaults to 16 characters', () => {
  assert.equal(randomString().length, 16);
});

test('randomString uses alphanumeric characters by default', () => {
  assert.match(randomString(64), /^[A-Za-z0-9]+$/);
});

test('randomString uses the requested length', () => {
  assert.equal(randomString(24).length, 24);
});

test('randomString returns empty string for zero length', () => {
  assert.equal(randomString(0), '');
});

test('randomString returns empty string for negative length', () => {
  assert.equal(randomString(-4), '');
});

test('randomString truncates fractional lengths', () => {
  assert.equal(randomString(4.9, 'a'), 'aaaa');
});

test('randomString returns empty string for invalid lengths', () => {
  assert.equal(randomString(Number.NaN), '');
});

test('randomString uses a custom alphabet', () => {
  assert.equal(randomString(6, 'z'), 'zzzzzz');
});

test('randomString returns empty string for an empty alphabet', () => {
  assert.equal(randomString(6, ''), '');
});

test('randomInt returns an integer within an inclusive range', () => {
  const value = randomInt(3, 7);
  assert.equal(Number.isInteger(value), true);
  assert.equal(value >= 3 && value <= 7, true);
});

test('randomInt returns the only value in a single-value range', () => {
  assert.equal(randomInt(5, 5), 5);
});

test('randomInt supports one argument as the maximum', () => {
  const value = randomInt(4);
  assert.equal(value >= 0 && value <= 4, true);
});

test('randomInt swaps reversed bounds', () => {
  const value = randomInt(10, 8);
  assert.equal(value >= 8 && value <= 10, true);
});

test('randomInt truncates fractional bounds', () => {
  assert.equal(randomInt(2.8, 2.9), 2);
});

test('randomInt supports negative ranges', () => {
  const value = randomInt(-5, -2);
  assert.equal(value >= -5 && value <= -2, true);
});

test('randomInt returns undefined for an invalid minimum', () => {
  assert.equal(randomInt('x', 4), undefined);
});

test('randomInt returns undefined for an invalid maximum', () => {
  assert.equal(randomInt(1, Infinity), undefined);
});

test('randomUUID returns an RFC 4122 version 4 UUID', () => {
  assert.match(randomUUID(), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});

test('randomPick returns one value from the array', () => {
  assert.equal(['red'].includes(randomPick(['red'])), true);
});

test('randomPick returns undefined for an empty array', () => {
  assert.equal(randomPick([]), undefined);
});

test('randomPick returns the fallback for invalid input', () => {
  assert.equal(randomPick(null, 'fallback'), 'fallback');
});
