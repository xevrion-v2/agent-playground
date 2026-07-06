import assert from "node:assert/strict";
import test from "node:test";

import { isEnSpacePresent } from "./is-en-space-present";

test("returns true when the value contains an en space", () => {
  assert.equal(isEnSpacePresent("left\u2002right"), true);
  assert.equal(isEnSpacePresent("\u2002leading"), true);
  assert.equal(isEnSpacePresent("trailing\u2002"), true);
});

test("returns false for adjacent spacing characters", () => {
  assert.equal(isEnSpacePresent("left right"), false);
  assert.equal(isEnSpacePresent("left\u2003right"), false);
  assert.equal(isEnSpacePresent("left\u2009right"), false);
  assert.equal(isEnSpacePresent(""), false);
});
