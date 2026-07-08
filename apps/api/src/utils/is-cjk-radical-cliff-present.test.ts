import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalCliffPresent } from "./is-cjk-radical-cliff-present";

test("returns true when the cjk radical cliff character is present", () => {
  assert.equal(isCjkRadicalCliffPresent(`abc\u2e81def`), true);
  assert.equal(isCjkRadicalCliffPresent("abcdef"), false);
  assert.equal(isCjkRadicalCliffPresent("abc"), false);
});
