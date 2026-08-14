import assert from "node:assert/strict";
import test from "node:test";

import { hasFiveDigitCharacter } from "./has-five-digit-character";

test("returns true when the value contains the 5 character", () => {
  assert.equal(hasFiveDigitCharacter("left5right"), true);
  assert.equal(hasFiveDigitCharacter("5leading"), true);
  assert.equal(hasFiveDigitCharacter("trailing5"), true);
});

test("returns false for adjacent digit characters and empty values", () => {
  assert.equal(hasFiveDigitCharacter("left right"), false);
  assert.equal(hasFiveDigitCharacter("left4right"), false);
  assert.equal(hasFiveDigitCharacter("left6right"), false);
  assert.equal(hasFiveDigitCharacter("left0right"), false);
  assert.equal(hasFiveDigitCharacter(""), false);
});
