import assert from 'node:assert/strict';
import test from 'node:test';

import { isVerticalIdeographicIterationMarkPresent } from '../utils/is-vertical-ideographic-iteration-mark-present.ts';

test('detects the vertical ideographic iteration mark character', () => {
  assert.equal(isVerticalIdeographicIterationMarkPresent('target: \u303B'), true);
});

test('returns false when the vertical ideographic iteration mark character is absent', () => {
  assert.equal(isVerticalIdeographicIterationMarkPresent('plain latin text'), false);
  assert.equal(isVerticalIdeographicIterationMarkPresent('nearby but not target'), false);
});
