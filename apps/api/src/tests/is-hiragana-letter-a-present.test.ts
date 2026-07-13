import assert from 'node:assert/strict';
import test from 'node:test';

import { isHiraganaLetterAPresent } from '../utils/is-hiragana-letter-a-present.ts';

test('detects the Hiragana letter A character', () => {
  assert.equal(isHiraganaLetterAPresent('target: \u3042'), true);
});

test('returns false when the Hiragana letter A character is absent', () => {
  assert.equal(isHiraganaLetterAPresent('plain latin text'), false);
  assert.equal(isHiraganaLetterAPresent('nearby but not target'), false);
});
