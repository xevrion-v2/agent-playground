import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalKnifeOnePresent } from "./is-cjk-radical-knife-one-present";

test("returns true when the cjk radical knife one character is present", () => {
  assert.equal(isCjkRadicalKnifeOnePresent(`abc\u2e88def`), true);
  assert.equal(isCjkRadicalKnifeOnePresent("abcdef"), false);
  assert.equal(isCjkRadicalKnifeOnePresent("abc"), false);
});
