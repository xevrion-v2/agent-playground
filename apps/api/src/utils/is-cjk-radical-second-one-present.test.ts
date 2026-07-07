import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalSecondOnePresent } from "./is-cjk-radical-second-one-present";

test("returns true when the cjk radical second one character is present", () => {
  assert.equal(isCjkRadicalSecondOnePresent(`abc\u2e82def`), true);
  assert.equal(isCjkRadicalSecondOnePresent("abcdef"), false);
  assert.equal(isCjkRadicalSecondOnePresent("abc"), false);
});
