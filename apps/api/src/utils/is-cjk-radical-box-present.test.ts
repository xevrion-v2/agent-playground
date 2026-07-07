import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalBoxPresent } from "./is-cjk-radical-box-present";

test("returns true when the cjk radical box character is present", () => {
  assert.equal(isCjkRadicalBoxPresent(`abc\u2e86def`), true);
  assert.equal(isCjkRadicalBoxPresent("abcdef"), false);
  assert.equal(isCjkRadicalBoxPresent("abc"), false);
});
