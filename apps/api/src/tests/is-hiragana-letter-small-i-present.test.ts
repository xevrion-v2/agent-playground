import assert from 'node:assert/strict';
import test from 'node:test';

import { isHiraganaLetterSmallIPresent } from '../utils/is-hiragana-letter-small-i-present.ts';

test('detects the Hiragana letter small I character', () => {
  assert.equal(isHiraganaLetterSmallIPresent('kana: \u3043'), true);
});

test('returns false when the Hiragana letter small I character is absent', () => {
  assert.equal(isHiraganaLetterSmallIPresent('plain latin text'), false);
  assert.equal(isHiraganaLetterSmallIPresent('kana: missing target'), false);
});
