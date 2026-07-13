import assert from 'node:assert/strict';
import test from 'node:test';

import { isIdeographicVariationIndicatorPresent } from '../utils/is-ideographic-variation-indicator-present.ts';

test('detects the ideographic variation indicator character', () => {
  assert.equal(isIdeographicVariationIndicatorPresent('target: \u303E'), true);
});

test('returns false when the ideographic variation indicator character is absent', () => {
  assert.equal(isIdeographicVariationIndicatorPresent('plain latin text'), false);
  assert.equal(isIdeographicVariationIndicatorPresent('nearby but not target'), false);
});
