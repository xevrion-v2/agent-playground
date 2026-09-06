import assert from "node:assert/strict";
import test from "node:test";

import { isTopHalfSectionSignPresent } from "./is-top-half-section-sign-present";

test("returns true when the value contains a top half section sign", () => {
  assert.equal(isTopHalfSectionSignPresent("left\u2e39right"), true);
  assert.equal(isTopHalfSectionSignPresent("\u2e39leading"), true);
  assert.equal(isTopHalfSectionSignPresent("trailing\u2e39"), true);
});

test("returns false for regular and adjacent section-like values", () => {
  assert.equal(isTopHalfSectionSignPresent("left\u00a7right"), false);
  assert.equal(isTopHalfSectionSignPresent("left\u2e36right"), false);
  assert.equal(isTopHalfSectionSignPresent("left\u2e37right"), false);
  assert.equal(isTopHalfSectionSignPresent(""), false);
});
