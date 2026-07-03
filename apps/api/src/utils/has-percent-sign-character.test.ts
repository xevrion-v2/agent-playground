import test from "node:test";
import assert from "node:assert/strict";
import { hasPercentSignCharacter } from "./has-percent-sign-character";

test("hasPercentSignCharacter finds percent sign", () => {
  assert.equal(hasPercentSignCharacter("100%"), true);
  assert.equal(hasPercentSignCharacter("abc%xyz"), true);
  assert.equal(hasPercentSignCharacter("abc"), false);
  assert.equal(hasPercentSignCharacter(""), false);
});
