import assert from 'node:assert/strict';
import test from 'node:test';
import { isReversedQuestionMarkPresent } from './is-reversed-question-mark-present.js';

test('isReversedQuestionMarkPresent returns true if string contains \u2E2E', () => {
  assert.equal(isReversedQuestionMarkPresent('hello \u2E2E world'), true);
  assert.equal(isReversedQuestionMarkPresent('\u2E2E'), true);
});

test('isReversedQuestionMarkPresent returns false if string does not contain \u2E2E', () => {
  assert.equal(isReversedQuestionMarkPresent('hello world'), false);
  assert.equal(isReversedQuestionMarkPresent(''), false);
  assert.equal(isReversedQuestionMarkPresent(null as any), false);
});
