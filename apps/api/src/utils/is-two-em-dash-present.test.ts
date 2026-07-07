import assert from "node:assert/strict";
import test from "node:test";

import { isTwoEmDashPresent } from "./is-two-em-dash-present";

test("returns true when the value contains a two-em dash", () => {
  assert.equal(isTwoEmDashPresent("left\u2e3aright"), true);
  assert.equal(isTwoEmDashPresent("\u2e3aleading"), true);
  assert.equal(isTwoEmDashPresent("trailing\u2e3a"), true);
});

test("returns false for regular and adjacent dash values", () => {
  assert.equal(isTwoEmDashPresent("left-right"), false);
  assert.equal(isTwoEmDashPresent("left\u2014right"), false);
  assert.equal(isTwoEmDashPresent("left\u2e3bright"), false);
  assert.equal(isTwoEmDashPresent(""), false);
});
