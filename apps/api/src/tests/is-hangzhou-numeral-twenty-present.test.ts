import assert from 'node:assert/strict';
import test from 'node:test';

import { isHangzhouNumeralTwentyPresent } from '../utils/is-hangzhou-numeral-twenty-present.ts';

test('detects the Hangzhou numeral twenty character', () => {
  assert.equal(isHangzhouNumeralTwentyPresent('target: \u3039'), true);
});

test('returns false when the Hangzhou numeral twenty character is absent', () => {
  assert.equal(isHangzhouNumeralTwentyPresent('plain latin text'), false);
  assert.equal(isHangzhouNumeralTwentyPresent('nearby but not target'), false);
});
