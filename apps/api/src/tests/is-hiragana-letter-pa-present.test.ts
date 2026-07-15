import assert from 'node:assert/strict';
import test from 'node:test';

import { IsHiraganaLetterPaPresent } from '../utils/is-hiragana-letter-pa-present.ts';

test('detects the Hiragana letter PA character', () => {
  assert.equal(IsHiraganaLetterPaPresent('target: \u3071'), true);
});

test('returns false when the Hiragana letter PA character is absent', () => {
  assert.equal(IsHiraganaLetterPaPresent('plain latin text'), false);
  assert.equal(IsHiraganaLetterPaPresent('nearby Hiragana but not target: \u3042'), false);
});
