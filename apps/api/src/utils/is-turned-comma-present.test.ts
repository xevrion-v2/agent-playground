import assert from "node:assert/strict";
import test from "node:test";

import { isTurnedCommaPresent } from "./is-turned-comma-present";

test("returns true when the value contains a turned comma", () => {
  assert.equal(isTurnedCommaPresent("left\u2e32right"), true);
  assert.equal(isTurnedCommaPresent("\u2e32leading"), true);
  assert.equal(isTurnedCommaPresent("trailing\u2e32"), true);
});

test("returns false for regular and adjacent comma-like values", () => {
  assert.equal(isTurnedCommaPresent("left,right"), false);
  assert.equal(isTurnedCommaPresent("left\u2e34right"), false);
  assert.equal(isTurnedCommaPresent("left;right"), false);
  assert.equal(isTurnedCommaPresent(""), false);
});
