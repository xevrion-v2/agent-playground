import assert from 'node:assert/strict';
import test from 'node:test';

import { isHiraganaLetterSmallAPresent } from '../utils/is-hiragana-letter-small-a-present.ts';

test('detects the Hiragana letter small A character', () => {
  assert.equal(isHiraganaLetterSmallAPresent('target: \u3041'), true);
});

test('returns false when the Hiragana letter small A character is absent', () => {
  assert.equal(isHiraganaLetterSmallAPresent('plain latin text'), false);
  assert.equal(isHiraganaLetterSmallAPresent('nearby but not target'), false);
});
