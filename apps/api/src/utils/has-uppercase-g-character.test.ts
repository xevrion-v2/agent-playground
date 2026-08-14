import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseGCharacter } from "./has-uppercase-g-character";

test("returns false when the string has no uppercase G", () => {
  assert.equal(hasUppercaseGCharacter("agent playground"), false);
});

test("returns true when the string contains uppercase G", () => {
  assert.equal(hasUppercaseGCharacter("Galaxy"), true);
});
