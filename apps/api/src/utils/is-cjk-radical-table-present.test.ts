import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalTablePresent } from "./is-cjk-radical-table-present";

test("returns true when the cjk radical table character is present", () => {
  assert.equal(isCjkRadicalTablePresent(`abc\u2e87def`), true);
  assert.equal(isCjkRadicalTablePresent("abcdef"), false);
  assert.equal(isCjkRadicalTablePresent("abc"), false);
});
