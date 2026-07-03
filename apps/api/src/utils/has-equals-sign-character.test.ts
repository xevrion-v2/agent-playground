import test from "node:test";
import assert from "node:assert/strict";
import { hasEqualsSignCharacter } from "./has-equals-sign-character";

test("hasEqualsSignCharacter finds equals sign", () => {
  assert.equal(hasEqualsSignCharacter("a=b"), true);
  assert.equal(hasEqualsSignCharacter("abc=xyz"), true);
  assert.equal(hasEqualsSignCharacter("abc"), false);
  assert.equal(hasEqualsSignCharacter(""), false);
});
