import assert from 'node:assert/strict';
import test from 'node:test';

import { isIdeographicHalfFillSpacePresent } from '../utils/is-ideographic-half-fill-space-present.ts';

test('detects the ideographic half fill space character', () => {
  assert.equal(isIdeographicHalfFillSpacePresent('target: \u303F'), true);
});

test('returns false when the ideographic half fill space character is absent', () => {
  assert.equal(isIdeographicHalfFillSpacePresent('plain latin text'), false);
  assert.equal(isIdeographicHalfFillSpacePresent('nearby but not target'), false);
});
