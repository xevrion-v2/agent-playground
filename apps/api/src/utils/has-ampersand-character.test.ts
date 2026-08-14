import assert from "node:assert/strict";
import test from "node:test";

import { hasAmpersandCharacter } from "./has-ampersand-character";

test("returns true when the value contains an ampersand character", () => {
  assert.equal(hasAmpersandCharacter("left&right"), true);
  assert.equal(hasAmpersandCharacter("&leading"), true);
  assert.equal(hasAmpersandCharacter("trailing&"), true);
});

test("returns false for adjacent symbol characters and empty values", () => {
  assert.equal(hasAmpersandCharacter("left right"), false);
  assert.equal(hasAmpersandCharacter("left+right"), false);
  assert.equal(hasAmpersandCharacter("left=right"), false);
  assert.equal(hasAmpersandCharacter("left*right"), false);
  assert.equal(hasAmpersandCharacter("left%right"), false);
  assert.equal(hasAmpersandCharacter(""), false);
});
