import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalTablePresent } from "./is-cjk-radical-table-present";

test("returns true when the value contains the cjk radical table character", () => {
  assert.equal(isCjkRadicalTablePresent("left\u2e87right"), true);
  assert.equal(isCjkRadicalTablePresent("\u2e87leading"), true);
  assert.equal(isCjkRadicalTablePresent("trailing\u2e87"), true);
});

test("returns false for empty strings and adjacent cjk radicals", () => {
  assert.equal(isCjkRadicalTablePresent(""), false);
  assert.equal(isCjkRadicalTablePresent("table"), false);
  assert.equal(isCjkRadicalTablePresent("left\u2e86right"), false);
  assert.equal(isCjkRadicalTablePresent("left\u2e88right"), false);
});
