import assert from "node:assert/strict";
import test from "node:test";

import { isHairSpacePresent } from "./is-hair-space-present";

test("returns true when the value contains a hair space", () => {
  assert.equal(isHairSpacePresent("left\u200aright"), true);
  assert.equal(isHairSpacePresent("\u200aleading"), true);
  assert.equal(isHairSpacePresent("trailing\u200a"), true);
});

test("returns false for adjacent spacing characters", () => {
  assert.equal(isHairSpacePresent("left right"), false);
  assert.equal(isHairSpacePresent("left\u2009right"), false);
  assert.equal(isHairSpacePresent("left\u2006right"), false);
  assert.equal(isHairSpacePresent(""), false);
});
