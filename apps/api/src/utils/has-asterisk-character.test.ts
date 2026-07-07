import assert from "node:assert/strict";
import test from "node:test";

import { hasAsteriskCharacter } from "./has-asterisk-character";

test("returns true when the value contains an asterisk character", () => {
  assert.equal(hasAsteriskCharacter("left*right"), true);
  assert.equal(hasAsteriskCharacter("*leading"), true);
  assert.equal(hasAsteriskCharacter("trailing*"), true);
});

test("returns false for adjacent symbol characters and empty values", () => {
  assert.equal(hasAsteriskCharacter("left right"), false);
  assert.equal(hasAsteriskCharacter("left+right"), false);
  assert.equal(hasAsteriskCharacter("left=right"), false);
  assert.equal(hasAsteriskCharacter("left%right"), false);
  assert.equal(hasAsteriskCharacter(""), false);
});
