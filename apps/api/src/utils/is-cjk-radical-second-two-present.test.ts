import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalSecondTwoPresent } from "./is-cjk-radical-second-two-present";

test("returns true when the cjk radical second two character is present", () => {
  assert.equal(isCjkRadicalSecondTwoPresent(`abc\u2e83def`), true);
  assert.equal(isCjkRadicalSecondTwoPresent("abcdef"), false);
  assert.equal(isCjkRadicalSecondTwoPresent("abc"), false);
});
