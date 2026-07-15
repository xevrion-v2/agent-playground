import assert from 'node:assert/strict';
import test from 'node:test';

import { IsHiraganaLetterNoPresent } from '../utils/is-hiragana-letter-no-present.ts';

test('detects the Hiragana letter NO character', () => {
  assert.equal(IsHiraganaLetterNoPresent('target: \u306E'), true);
});

test('returns false when the Hiragana letter NO character is absent', () => {
  assert.equal(IsHiraganaLetterNoPresent('plain latin text'), false);
  assert.equal(IsHiraganaLetterNoPresent('nearby Hiragana but not target: \u3042'), false);
});
