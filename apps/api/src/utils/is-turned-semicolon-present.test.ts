import assert from "node:assert/strict";
import test from "node:test";

import { isTurnedSemicolonPresent } from "./is-turned-semicolon-present";

test("returns true when the value contains a turned semicolon", () => {
  assert.equal(isTurnedSemicolonPresent("left\u2e35right"), true);
  assert.equal(isTurnedSemicolonPresent("\u2e35leading"), true);
  assert.equal(isTurnedSemicolonPresent("trailing\u2e35"), true);
});

test("returns false for regular and adjacent semicolon-like values", () => {
  assert.equal(isTurnedSemicolonPresent("left;right"), false);
  assert.equal(isTurnedSemicolonPresent("left\u2e34right"), false);
  assert.equal(isTurnedSemicolonPresent("left,right"), false);
  assert.equal(isTurnedSemicolonPresent(""), false);
});
