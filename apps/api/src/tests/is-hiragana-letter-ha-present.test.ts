import assert from 'node:assert/strict';
import test from 'node:test';

import { IsHiraganaLetterHaPresent } from '../utils/is-hiragana-letter-ha-present.ts';

test('detects the Hiragana letter HA character', () => {
  assert.equal(IsHiraganaLetterHaPresent('target: \u306F'), true);
});

test('returns false when the Hiragana letter HA character is absent', () => {
  assert.equal(IsHiraganaLetterHaPresent('plain latin text'), false);
  assert.equal(IsHiraganaLetterHaPresent('nearby Hiragana but not target: \u3042'), false);
});
