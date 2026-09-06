import assert from 'node:assert/strict';
import test from 'node:test';

import { isHiraganaLetterEPresent } from '../utils/is-hiragana-letter-e-present.ts';

test('detects the Hiragana letter E character', () => {
  assert.equal(isHiraganaLetterEPresent('kana: \u3048'), true);
});

test('returns false when the Hiragana letter E character is absent', () => {
  assert.equal(isHiraganaLetterEPresent('plain latin text'), false);
  assert.equal(isHiraganaLetterEPresent('kana: missing target'), false);
});
