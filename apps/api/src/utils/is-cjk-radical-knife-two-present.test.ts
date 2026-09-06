import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalKnifeTwoPresent } from "./is-cjk-radical-knife-two-present";

test("returns true when the value contains the cjk radical knife two character", () => {
  assert.equal(isCjkRadicalKnifeTwoPresent("left\u2e89right"), true);
  assert.equal(isCjkRadicalKnifeTwoPresent("\u2e89leading"), true);
  assert.equal(isCjkRadicalKnifeTwoPresent("trailing\u2e89"), true);
});

test("returns false for empty strings and adjacent cjk radicals", () => {
  assert.equal(isCjkRadicalKnifeTwoPresent(""), false);
  assert.equal(isCjkRadicalKnifeTwoPresent("knife"), false);
  assert.equal(isCjkRadicalKnifeTwoPresent("left\u2e88right"), false);
  assert.equal(isCjkRadicalKnifeTwoPresent("left\u2e8aright"), false);
});
