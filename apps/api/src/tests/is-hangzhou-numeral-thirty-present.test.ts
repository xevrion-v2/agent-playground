import assert from 'node:assert/strict';
import test from 'node:test';

import { isHangzhouNumeralThirtyPresent } from '../utils/is-hangzhou-numeral-thirty-present.ts';

test('detects the Hangzhou numeral thirty character', () => {
  assert.equal(isHangzhouNumeralThirtyPresent('target: \u303A'), true);
});

test('returns false when the Hangzhou numeral thirty character is absent', () => {
  assert.equal(isHangzhouNumeralThirtyPresent('plain latin text'), false);
  assert.equal(isHangzhouNumeralThirtyPresent('nearby but not target'), false);
});
