import assert from 'node:assert/strict';
import test from 'node:test';

import { isHangzhouNumeralTenPresent } from '../utils/is-hangzhou-numeral-ten-present.ts';

test('detects the Hangzhou numeral ten character', () => {
  assert.equal(isHangzhouNumeralTenPresent('target: \u3038'), true);
});

test('returns false when the Hangzhou numeral ten character is absent', () => {
  assert.equal(isHangzhouNumeralTenPresent('plain latin text'), false);
  assert.equal(isHangzhouNumeralTenPresent('nearby but not target'), false);
});
