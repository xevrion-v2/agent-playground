import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalPersonPresent } from "./is-cjk-radical-person-present";

test("returns true when the value contains the cjk radical person character", () => {
  assert.equal(isCjkRadicalPersonPresent("left\u2e85right"), true);
  assert.equal(isCjkRadicalPersonPresent("\u2e85leading"), true);
  assert.equal(isCjkRadicalPersonPresent("trailing\u2e85"), true);
});

test("returns false for empty strings and adjacent cjk radicals", () => {
  assert.equal(isCjkRadicalPersonPresent(""), false);
  assert.equal(isCjkRadicalPersonPresent("person"), false);
  assert.equal(isCjkRadicalPersonPresent("left\u2e84right"), false);
  assert.equal(isCjkRadicalPersonPresent("left\u2e86right"), false);
});
