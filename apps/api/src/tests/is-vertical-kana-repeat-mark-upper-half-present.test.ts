import assert from 'node:assert/strict';
import test from 'node:test';

import { isVerticalKanaRepeatMarkUpperHalfPresent } from '../utils/is-vertical-kana-repeat-mark-upper-half-present.ts';

test('detects the vertical kana repeat mark upper half character', () => {
  assert.equal(isVerticalKanaRepeatMarkUpperHalfPresent('target: \u3033'), true);
});

test('returns false when the vertical kana repeat mark upper half character is absent', () => {
  assert.equal(isVerticalKanaRepeatMarkUpperHalfPresent('plain latin text'), false);
  assert.equal(isVerticalKanaRepeatMarkUpperHalfPresent('nearby but not target'), false);
});
