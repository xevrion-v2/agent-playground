import assert from "node:assert/strict";
import test from "node:test";

import { hasEightDigitCharacter } from "./has-eight-digit-character";

test("returns false when the string has no 8", () => {
  assert.equal(hasEightDigitCharacter("1234567"), false);
});

test("returns true when the string contains 8", () => {
  assert.equal(hasEightDigitCharacter("12345678"), true);
});
