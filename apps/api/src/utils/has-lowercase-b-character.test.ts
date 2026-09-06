import assert from "node:assert/strict";
import test from "node:test";

import { hasLowercaseBCharacter } from "./has-lowercase-b-character";

test("returns false when the string has no lowercase b", () => {
  assert.equal(hasLowercaseBCharacter("alpha"), false);
});

test("returns true when the string contains lowercase b", () => {
  assert.equal(hasLowercaseBCharacter("bloom"), true);
});
