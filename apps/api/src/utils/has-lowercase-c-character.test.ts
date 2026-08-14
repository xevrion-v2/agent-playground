import assert from "node:assert/strict";
import test from "node:test";

import { hasLowercaseCCharacter } from "./has-lowercase-c-character";

test("returns false when the string has no lowercase c", () => {
  assert.equal(hasLowercaseCCharacter("alpha beta"), false);
});

test("returns true when the string contains lowercase c", () => {
  assert.equal(hasLowercaseCCharacter("cosmos"), true);
});
