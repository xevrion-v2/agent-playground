import assert from 'node:assert/strict';
import test from 'node:test';

import { isCircledPostalMarkPresent } from '../utils/is-circled-postal-mark-present.ts';

test('detects the circled postal mark character', () => {
  assert.equal(isCircledPostalMarkPresent('target: \u3036'), true);
});

test('returns false when the circled postal mark character is absent', () => {
  assert.equal(isCircledPostalMarkPresent('plain latin text'), false);
  assert.equal(isCircledPostalMarkPresent('nearby but not target'), false);
});
