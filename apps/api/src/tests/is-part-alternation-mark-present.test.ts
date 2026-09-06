import assert from 'node:assert/strict';
import test from 'node:test';

import { isPartAlternationMarkPresent } from '../utils/is-part-alternation-mark-present.ts';

test('detects the part alternation mark character', () => {
  assert.equal(isPartAlternationMarkPresent('target: \u303D'), true);
});

test('returns false when the part alternation mark character is absent', () => {
  assert.equal(isPartAlternationMarkPresent('plain latin text'), false);
  assert.equal(isPartAlternationMarkPresent('nearby but not target'), false);
});
