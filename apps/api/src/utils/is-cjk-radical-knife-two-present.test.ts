import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalKnifeTwoPresent } from "./is-cjk-radical-knife-two-present";

test("returns true when the cjk radical knife two character is present", () => {
  assert.equal(isCjkRadicalKnifeTwoPresent(`abc\u2e89def`), true);
  assert.equal(isCjkRadicalKnifeTwoPresent("abcdef"), false);
  assert.equal(isCjkRadicalKnifeTwoPresent("abc"), false);
});
