import assert from "node:assert/strict";
import test from "node:test";

import { isCjkRadicalKnifeOnePresent } from "./is-cjk-radical-knife-one-present";

test("returns true when the value contains the cjk radical knife one character", () => {
  assert.equal(isCjkRadicalKnifeOnePresent("left\u2e88right"), true);
  assert.equal(isCjkRadicalKnifeOnePresent("\u2e88leading"), true);
  assert.equal(isCjkRadicalKnifeOnePresent("trailing\u2e88"), true);
});

test("returns false for empty strings and adjacent cjk radicals", () => {
  assert.equal(isCjkRadicalKnifeOnePresent(""), false);
  assert.equal(isCjkRadicalKnifeOnePresent("knife"), false);
  assert.equal(isCjkRadicalKnifeOnePresent("left\u2e87right"), false);
  assert.equal(isCjkRadicalKnifeOnePresent("left\u2e89right"), false);
});
