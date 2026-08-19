import assert from 'node:assert/strict';
import test from 'node:test';

import { isLeftDoubleAngleBracketPresent } from '../utils/is-left-double-angle-bracket-present.ts';

test('detects the left double angle bracket character', () => {
  assert.equal(isLeftDoubleAngleBracketPresent('target: \u300A'), true);
});

test('returns false when the left double angle bracket character is absent', () => {
  assert.equal(isLeftDoubleAngleBracketPresent('plain latin text'), false);
  assert.equal(isLeftDoubleAngleBracketPresent('nearby but not target'), false);
});
