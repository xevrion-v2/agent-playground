import assert from 'node:assert/strict';
import test from 'node:test';
import { isFiveDotMarkPresent } from './is-five-dot-mark-present.js';

test('isFiveDotMarkPresent returns true if string contains \u2E2D', () => {
  assert.equal(isFiveDotMarkPresent('hello \u2E2D world'), true);
  assert.equal(isFiveDotMarkPresent('\u2E2D'), true);
});

test('isFiveDotMarkPresent returns false if string does not contain \u2E2D', () => {
  assert.equal(isFiveDotMarkPresent('hello world'), false);
  assert.equal(isFiveDotMarkPresent(''), false);
  assert.equal(isFiveDotMarkPresent(null as any), false);
});
