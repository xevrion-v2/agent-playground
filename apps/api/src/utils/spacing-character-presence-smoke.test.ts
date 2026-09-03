import test from "node:test";
import assert from "node:assert/strict";

import { isNonBreakingSpacePresent } from "./is-non-breaking-space-present";
import { isZeroWidthSpacePresent } from "./is-zero-width-space-present";

test("spacing character helpers detect only their target characters", () => {
  assert.equal(isNonBreakingSpacePresent("a\u00A0b"), true);
  assert.equal(isNonBreakingSpacePresent("a b"), false);

  assert.equal(isZeroWidthSpacePresent("zero\u200Bwidth"), true);
  assert.equal(isZeroWidthSpacePresent("zero width"), false);
});
