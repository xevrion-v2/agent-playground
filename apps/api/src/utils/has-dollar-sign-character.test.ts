import test from "node:test";
import assert from "node:assert/strict";
import { hasDollarSignCharacter } from "./has-dollar-sign-character";

test("hasDollarSignCharacter finds dollar sign", () => {
  assert.equal(hasDollarSignCharacter("$100"), true);
  assert.equal(hasDollarSignCharacter("abc$xyz"), true);
  assert.equal(hasDollarSignCharacter("abc"), false);
  assert.equal(hasDollarSignCharacter(""), false);
});
