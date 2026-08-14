import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalBoxPresent } from "./is-cjk-radical-box-present";

test("returns true when the value contains the cjk radical box character", () => {
  assert.equal(isCjkRadicalBoxPresent("left\u2e86right"), true);
  assert.equal(isCjkRadicalBoxPresent("\u2e86leading"), true);
  assert.equal(isCjkRadicalBoxPresent("trailing\u2e86"), true);
});

test("returns false for empty strings and adjacent cjk radicals", () => {
  assert.equal(isCjkRadicalBoxPresent(""), false);
  assert.equal(isCjkRadicalBoxPresent("box"), false);
  assert.equal(isCjkRadicalBoxPresent("left\u2e85right"), false);
  assert.equal(isCjkRadicalBoxPresent("left\u2e87right"), false);
});
