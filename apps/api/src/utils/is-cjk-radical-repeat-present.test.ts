import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalRepeatPresent } from "./is-cjk-radical-repeat-present";

test("returns true when the cjk radical repeat character is present", () => {
  assert.equal(isCjkRadicalRepeatPresent(`abc\u2e80def`), true);
  assert.equal(isCjkRadicalRepeatPresent("abcdef"), false);
  assert.equal(isCjkRadicalRepeatPresent("abc"), false);
});
