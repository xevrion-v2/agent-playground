import assert from 'node:assert/strict';
import test from 'node:test';

import { isLeftAngleBracketPresent } from '../utils/is-left-angle-bracket-present.ts';

test('detects the left angle bracket character', () => {
  assert.equal(isLeftAngleBracketPresent('target: \u3008'), true);
});

test('returns false when the left angle bracket character is absent', () => {
  assert.equal(isLeftAngleBracketPresent('plain latin text'), false);
  assert.equal(isLeftAngleBracketPresent('nearby but not target'), false);
});
