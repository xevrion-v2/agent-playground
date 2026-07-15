import assert from 'node:assert/strict';
import test from 'node:test';

import { isVerticalKanaRepeatWithVoicedSoundMarkUpperHalfPresent } from '../utils/is-vertical-kana-repeat-with-voiced-sound-mark-upper-half-present.ts';

test('detects the vertical kana repeat with voiced sound mark upper half character', () => {
  assert.equal(isVerticalKanaRepeatWithVoicedSoundMarkUpperHalfPresent('target: \u3034'), true);
});

test('returns false when the vertical kana repeat with voiced sound mark upper half character is absent', () => {
  assert.equal(isVerticalKanaRepeatWithVoicedSoundMarkUpperHalfPresent('plain latin text'), false);
  assert.equal(isVerticalKanaRepeatWithVoicedSoundMarkUpperHalfPresent('nearby but not target'), false);
});
