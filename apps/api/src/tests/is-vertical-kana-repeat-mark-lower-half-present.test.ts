import assert from 'node:assert/strict';
import test from 'node:test';

import { isVerticalKanaRepeatMarkLowerHalfPresent } from '../utils/is-vertical-kana-repeat-mark-lower-half-present.ts';

test('detects the vertical kana repeat mark lower half character', () => {
  assert.equal(isVerticalKanaRepeatMarkLowerHalfPresent('target: \u3035'), true);
});

test('returns false when the vertical kana repeat mark lower half character is absent', () => {
  assert.equal(isVerticalKanaRepeatMarkLowerHalfPresent('plain latin text'), false);
  assert.equal(isVerticalKanaRepeatMarkLowerHalfPresent('nearby but not target'), false);
});
