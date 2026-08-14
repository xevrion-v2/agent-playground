import assert from 'node:assert/strict';
import test from 'node:test';

import { isMasuMarkPresent } from '../utils/is-masu-mark-present.ts';

test('detects the masu mark character', () => {
  assert.equal(isMasuMarkPresent('target: \u303C'), true);
});

test('returns false when the masu mark character is absent', () => {
  assert.equal(isMasuMarkPresent('plain latin text'), false);
  assert.equal(isMasuMarkPresent('nearby but not target'), false);
});
