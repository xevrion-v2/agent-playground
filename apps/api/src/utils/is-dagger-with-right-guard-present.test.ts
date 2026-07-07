import assert from "node:assert/strict";
import test from "node:test";

import { isDaggerWithRightGuardPresent } from "./is-dagger-with-right-guard-present";

test("returns true when the value contains a dagger with right guard", () => {
  assert.equal(isDaggerWithRightGuardPresent("left\u2e37right"), true);
  assert.equal(isDaggerWithRightGuardPresent("\u2e37leading"), true);
  assert.equal(isDaggerWithRightGuardPresent("trailing\u2e37"), true);
});

test("returns false for regular and adjacent dagger-like values", () => {
  assert.equal(isDaggerWithRightGuardPresent("left\u2020right"), false);
  assert.equal(isDaggerWithRightGuardPresent("left\u2e36right"), false);
  assert.equal(isDaggerWithRightGuardPresent("left\u2e35right"), false);
  assert.equal(isDaggerWithRightGuardPresent(""), false);
});
