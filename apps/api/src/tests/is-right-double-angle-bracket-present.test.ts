import assert from 'node:assert/strict';
import test from 'node:test';

import { isRightDoubleAngleBracketPresent } from '../utils/is-right-double-angle-bracket-present.ts';

test('detects the right double angle bracket character', () => {
  assert.equal(isRightDoubleAngleBracketPresent('target: \u300B'), true);
});

test('returns false when the right double angle bracket character is absent', () => {
  assert.equal(isRightDoubleAngleBracketPresent('plain latin text'), false);
  assert.equal(isRightDoubleAngleBracketPresent('nearby but not target'), false);
});
