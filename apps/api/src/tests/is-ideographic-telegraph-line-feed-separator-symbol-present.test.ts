import assert from 'node:assert/strict';
import test from 'node:test';

import { isIdeographicTelegraphLineFeedSeparatorSymbolPresent } from '../utils/is-ideographic-telegraph-line-feed-separator-symbol-present.ts';

test('detects the ideographic telegraph line feed separator symbol character', () => {
  assert.equal(isIdeographicTelegraphLineFeedSeparatorSymbolPresent('target: \u3037'), true);
});

test('returns false when the ideographic telegraph line feed separator symbol character is absent', () => {
  assert.equal(isIdeographicTelegraphLineFeedSeparatorSymbolPresent('plain latin text'), false);
  assert.equal(isIdeographicTelegraphLineFeedSeparatorSymbolPresent('nearby but not target'), false);
});
