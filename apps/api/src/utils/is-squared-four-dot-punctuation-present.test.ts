import assert from 'node:assert/strict';
import test from 'node:test';
import { isSquaredFourDotPunctuationPresent } from './is-squared-four-dot-punctuation-present.js';

test('isSquaredFourDotPunctuationPresent returns true if string contains \u2E2C', () => {
  assert.equal(isSquaredFourDotPunctuationPresent('hello \u2E2C world'), true);
  assert.equal(isSquaredFourDotPunctuationPresent('\u2E2C'), true);
});

test('isSquaredFourDotPunctuationPresent returns false if string does not contain \u2E2C', () => {
  assert.equal(isSquaredFourDotPunctuationPresent('hello world'), false);
  assert.equal(isSquaredFourDotPunctuationPresent(''), false);
  assert.equal(isSquaredFourDotPunctuationPresent(null as any), false);
});
