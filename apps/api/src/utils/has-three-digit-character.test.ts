import assert from "node:assert/strict";
import test from "node:test";

import { hasThreeDigitCharacter } from "./has-three-digit-character";

test("returns true when the value contains the 3 character", () => {
  assert.equal(hasThreeDigitCharacter("left3right"), true);
  assert.equal(hasThreeDigitCharacter("3leading"), true);
  assert.equal(hasThreeDigitCharacter("trailing3"), true);
});

test("returns false for adjacent digit characters and empty values", () => {
  assert.equal(hasThreeDigitCharacter("left right"), false);
  assert.equal(hasThreeDigitCharacter("left2right"), false);
  assert.equal(hasThreeDigitCharacter("left4right"), false);
  assert.equal(hasThreeDigitCharacter("left0right"), false);
  assert.equal(hasThreeDigitCharacter(""), false);
});
