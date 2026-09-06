import assert from 'node:assert/strict';
import test from 'node:test';

import { isRightAngleBracketPresent } from '../utils/is-right-angle-bracket-present.ts';

test('detects the right angle bracket character', () => {
  assert.equal(isRightAngleBracketPresent('target: \u3009'), true);
});

test('returns false when the right angle bracket character is absent', () => {
  assert.equal(isRightAngleBracketPresent('plain latin text'), false);
  assert.equal(isRightAngleBracketPresent('nearby but not target'), false);
});
