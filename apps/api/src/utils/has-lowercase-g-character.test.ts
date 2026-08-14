import assert from "node:assert/strict";
import test from "node:test";

import { hasLowercaseGCharacter } from "./has-lowercase-g-character";

test("returns false when the string has no lowercase g", () => {
  assert.equal(hasLowercaseGCharacter("alpha beta"), false);
});

test("returns true when the string contains lowercase g", () => {
  assert.equal(hasLowercaseGCharacter("going"), true);
});
