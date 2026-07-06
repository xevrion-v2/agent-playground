import assert from "node:assert/strict";
import test from "node:test";

import { isDaggerWithLeftGuardPresent } from "./is-dagger-with-left-guard-present";

test("returns true when the value contains a dagger with left guard", () => {
  assert.equal(isDaggerWithLeftGuardPresent("left\u2e36right"), true);
  assert.equal(isDaggerWithLeftGuardPresent("\u2e36leading"), true);
  assert.equal(isDaggerWithLeftGuardPresent("trailing\u2e36"), true);
});

test("returns false for regular and adjacent dagger-like values", () => {
  assert.equal(isDaggerWithLeftGuardPresent("left\u2020right"), false);
  assert.equal(isDaggerWithLeftGuardPresent("left\u2e37right"), false);
  assert.equal(isDaggerWithLeftGuardPresent("left\u2e35right"), false);
  assert.equal(isDaggerWithLeftGuardPresent(""), false);
});
