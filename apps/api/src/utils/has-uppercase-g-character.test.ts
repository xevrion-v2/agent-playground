import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseGCharacter } from "./has-uppercase-g-character";

test("returns true when string contains uppercase G", () => {
  assert.equal(hasUppercaseGCharacter("ABCD G"), true);
  assert.equal(hasUppercaseGCharacter("gg"), false);
  assert.equal(hasUppercaseGCharacter("g"), false);
});

test("returns false when string has no uppercase G", () => {
  assert.equal(hasUppercaseGCharacter("hello world"), false);
  assert.equal(hasUppercaseGCharacter("gggg"), false);
  assert.equal(hasUppercaseGCharacter(""), false);
});
