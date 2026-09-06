import assert from "node:assert/strict";
import test from "node:test";

import { isFigureSpacePresent } from "./is-figure-space-present";

test("returns true when the value contains a figure space", () => {
  assert.equal(isFigureSpacePresent("left\u2007right"), true);
  assert.equal(isFigureSpacePresent("\u2007leading"), true);
  assert.equal(isFigureSpacePresent("trailing\u2007"), true);
});

test("returns false for adjacent spacing characters", () => {
  assert.equal(isFigureSpacePresent("left right"), false);
  assert.equal(isFigureSpacePresent("left\u2008right"), false);
  assert.equal(isFigureSpacePresent("left\u2009right"), false);
  assert.equal(isFigureSpacePresent(""), false);
});
