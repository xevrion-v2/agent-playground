import assert from 'node:assert/strict';
import test from 'node:test';
import { isVerticalTildePresent } from './is-vertical-tilde-present.js';

test('isVerticalTildePresent returns true if string contains \u2E2F', () => {
  assert.equal(isVerticalTildePresent('hello \u2E2F world'), true);
  assert.equal(isVerticalTildePresent('\u2E2F'), true);
});

test('isVerticalTildePresent returns false if string does not contain \u2E2F', () => {
  assert.equal(isVerticalTildePresent('hello world'), false);
  assert.equal(isVerticalTildePresent(''), false);
  assert.equal(isVerticalTildePresent(null as any), false);
});
