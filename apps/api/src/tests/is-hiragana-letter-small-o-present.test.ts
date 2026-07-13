import assert from 'node:assert/strict';
import test from 'node:test';

import { isHiraganaLetterSmallOPresent } from '../utils/is-hiragana-letter-small-o-present.ts';

test('detects the Hiragana letter small O character', () => {
  assert.equal(isHiraganaLetterSmallOPresent('kana: ぉ'), true);
});

test('returns false when the Hiragana letter small O character is absent', () => {
  assert.equal(isHiraganaLetterSmallOPresent('kana: お'), false);
  assert.equal(isHiraganaLetterSmallOPresent('plain latin text'), false);
});
