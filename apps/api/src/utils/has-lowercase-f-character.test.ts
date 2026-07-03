import assert from "node:assert/strict";
import test from "node:test";

import { hasLowercaseFCharacter } from "./has-lowercase-f-character";

test("returns false when the string has no lowercase f", () => {
  assert.equal(hasLowercaseFCharacter("alpha beta"), false);
});

test("returns true when the string contains lowercase f", () => {
  assert.equal(hasLowercaseFCharacter("forge"), true);
});
