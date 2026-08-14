import assert from "node:assert/strict";
import test from "node:test";

import { isEmSpacePresent } from "./is-em-space-present";

test("returns true when the value contains an em space", () => {
  assert.equal(isEmSpacePresent("left\u2003right"), true);
  assert.equal(isEmSpacePresent("\u2003leading"), true);
  assert.equal(isEmSpacePresent("trailing\u2003"), true);
});

test("returns false for adjacent spacing characters", () => {
  assert.equal(isEmSpacePresent("left right"), false);
  assert.equal(isEmSpacePresent("left\u2002right"), false);
  assert.equal(isEmSpacePresent("left\u2009right"), false);
  assert.equal(isEmSpacePresent(""), false);
});
