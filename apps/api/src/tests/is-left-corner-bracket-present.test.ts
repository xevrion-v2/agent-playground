import assert from 'node:assert/strict';
import test from 'node:test';

import { isLeftCornerBracketPresent } from '../utils/is-left-corner-bracket-present.ts';

test('detects the left corner bracket character', () => {
  assert.equal(isLeftCornerBracketPresent('target: \u300C'), true);
});

test('returns false when the left corner bracket character is absent', () => {
  assert.equal(isLeftCornerBracketPresent('plain latin text'), false);
  assert.equal(isLeftCornerBracketPresent('nearby but not target'), false);
});
