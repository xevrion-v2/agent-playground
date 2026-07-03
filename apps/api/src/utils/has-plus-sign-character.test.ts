import test from "node:test";
import assert from "node:assert/strict";
import { hasPlusSignCharacter } from "./has-plus-sign-character";

test("hasPlusSignCharacter finds plus sign", () => {
  assert.equal(hasPlusSignCharacter("1+1"), true);
  assert.equal(hasPlusSignCharacter("abc+xyz"), true);
  assert.equal(hasPlusSignCharacter("abc"), false);
  assert.equal(hasPlusSignCharacter(""), false);
});
