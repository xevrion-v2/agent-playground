import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalPersonPresent } from "./is-cjk-radical-person-present";

test("returns true when the cjk radical person character is present", () => {
  assert.equal(isCjkRadicalPersonPresent(`abc\u2e85def`), true);
  assert.equal(isCjkRadicalPersonPresent("abcdef"), false);
  assert.equal(isCjkRadicalPersonPresent("abc"), false);
});
