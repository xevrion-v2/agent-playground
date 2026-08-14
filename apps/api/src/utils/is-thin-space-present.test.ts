import assert from "node:assert/strict";
import test from "node:test";

import { isThinSpacePresent } from "./is-thin-space-present";

test("returns true when the value contains a thin space", () => {
  assert.equal(isThinSpacePresent("left\u2009right"), true);
  assert.equal(isThinSpacePresent("\u2009leading"), true);
  assert.equal(isThinSpacePresent("trailing\u2009"), true);
});

test("returns false for adjacent spacing characters", () => {
  assert.equal(isThinSpacePresent("left right"), false);
  assert.equal(isThinSpacePresent("left\u2002right"), false);
  assert.equal(isThinSpacePresent("left\u2003right"), false);
  assert.equal(isThinSpacePresent(""), false);
});
