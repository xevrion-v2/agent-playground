import assert from "node:assert/strict";
import test from "node:test";

import { hasSevenDigitCharacter } from "./has-seven-digit-character";

test("returns false when the string has no 7", () => {
  assert.equal(hasSevenDigitCharacter("123456"), false);
});

test("returns true when the string contains 7", () => {
  assert.equal(hasSevenDigitCharacter("1234567"), true);
});
