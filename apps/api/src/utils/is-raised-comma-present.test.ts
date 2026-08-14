import assert from "node:assert/strict";
import test from "node:test";

import { isRaisedCommaPresent } from "./is-raised-comma-present";

test("returns true when the value contains a raised comma", () => {
  assert.equal(isRaisedCommaPresent("left\u2e34right"), true);
  assert.equal(isRaisedCommaPresent("\u2e34leading"), true);
  assert.equal(isRaisedCommaPresent("trailing\u2e34"), true);
});

test("returns false for regular and adjacent comma-like values", () => {
  assert.equal(isRaisedCommaPresent("left,right"), false);
  assert.equal(isRaisedCommaPresent("left\u2e32right"), false);
  assert.equal(isRaisedCommaPresent("left;right"), false);
  assert.equal(isRaisedCommaPresent(""), false);
});
