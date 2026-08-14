import assert from 'node:assert/strict';
import test from 'node:test';

import { isHiraganaLetterSmallEPresent } from '../utils/is-hiragana-letter-small-e-present.ts';

test('detects the Hiragana letter small E character', () => {
  assert.equal(isHiraganaLetterSmallEPresent('kana: \u3047'), true);
});

test('returns false when the Hiragana letter small E character is absent', () => {
  assert.equal(isHiraganaLetterSmallEPresent('plain latin text'), false);
  assert.equal(isHiraganaLetterSmallEPresent('kana: missing target'), false);
});
