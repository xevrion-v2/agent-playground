import assert from 'node:assert/strict';
import test from 'node:test';

import { IsHiraganaLetterBaPresent } from '../utils/is-hiragana-letter-ba-present.ts';

test('detects the Hiragana letter BA character', () => {
  assert.equal(IsHiraganaLetterBaPresent('target: \u3070'), true);
});

test('returns false when the Hiragana letter BA character is absent', () => {
  assert.equal(IsHiraganaLetterBaPresent('plain latin text'), false);
  assert.equal(IsHiraganaLetterBaPresent('nearby Hiragana but not target: \u3042'), false);
});
