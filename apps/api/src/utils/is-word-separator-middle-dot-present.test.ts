import assert from 'node:assert/strict';
import test from 'node:test';
import { isWordSeparatorMiddleDotPresent } from './is-word-separator-middle-dot-present.js';

test('isWordSeparatorMiddleDotPresent returns true if string contains \u2E31', () => {
  assert.equal(isWordSeparatorMiddleDotPresent('hello \u2E31 world'), true);
  assert.equal(isWordSeparatorMiddleDotPresent('\u2E31'), true);
});

test('isWordSeparatorMiddleDotPresent returns false if string does not contain \u2E31', () => {
  assert.equal(isWordSeparatorMiddleDotPresent('hello world'), false);
  assert.equal(isWordSeparatorMiddleDotPresent(''), false);
  assert.equal(isWordSeparatorMiddleDotPresent(null as any), false);
});
