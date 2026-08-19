import assert from 'node:assert/strict';
import test from 'node:test';

import { IsHiraganaLetterPiPresent } from '../utils/is-hiragana-letter-pi-present.ts';

test('detects the Hiragana letter PI character', () => {
  assert.equal(IsHiraganaLetterPiPresent('target: \u3074'), true);
});

test('returns false when the Hiragana letter PI character is absent', () => {
  assert.equal(IsHiraganaLetterPiPresent('plain latin text'), false);
  assert.equal(IsHiraganaLetterPiPresent('nearby Hiragana but not target: \u3042'), false);
});
