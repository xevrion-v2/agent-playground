import assert from 'node:assert/strict';
import test from 'node:test';

import { IsHiraganaLetterBiPresent } from '../utils/is-hiragana-letter-bi-present.ts';

test('detects the Hiragana letter BI character', () => {
  assert.equal(IsHiraganaLetterBiPresent('target: \u3073'), true);
});

test('returns false when the Hiragana letter BI character is absent', () => {
  assert.equal(IsHiraganaLetterBiPresent('plain latin text'), false);
  assert.equal(IsHiraganaLetterBiPresent('nearby Hiragana but not target: \u3042'), false);
});
