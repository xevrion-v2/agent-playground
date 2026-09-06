import assert from 'node:assert/strict';
import test from 'node:test';

import { isHiraganaLetterIPresent } from '../utils/is-hiragana-letter-i-present.ts';

test('detects the Hiragana letter I character', () => {
  assert.equal(isHiraganaLetterIPresent('kana: \u3044'), true);
});

test('returns false when the Hiragana letter I character is absent', () => {
  assert.equal(isHiraganaLetterIPresent('plain latin text'), false);
  assert.equal(isHiraganaLetterIPresent('kana: missing target'), false);
});
