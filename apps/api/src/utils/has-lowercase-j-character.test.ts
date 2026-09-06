import assert from "node:assert/strict";
import test from "node:test";

import { hasLowercaseJCharacter } from "./has-lowercase-j-character";

test("returns false when the string has no lowercase j", () => {
  assert.equal(hasLowercaseJCharacter("agent playground"), false);
});

test("returns true when the string contains lowercase j", () => {
  assert.equal(hasLowercaseJCharacter("project"), true);
});
