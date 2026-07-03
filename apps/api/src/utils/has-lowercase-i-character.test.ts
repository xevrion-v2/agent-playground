import assert from "node:assert/strict";
import test from "node:test";

import { hasLowercaseICharacter } from "./has-lowercase-i-character";

test("returns false when the string has no lowercase i", () => {
  assert.equal(hasLowercaseICharacter("agent playground"), false);
});

test("returns true when the string contains lowercase i", () => {
  assert.equal(hasLowercaseICharacter("trivial"), true);
});
