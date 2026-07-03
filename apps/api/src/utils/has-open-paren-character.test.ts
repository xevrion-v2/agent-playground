import test from "node:test";
import assert from "node:assert/strict";
import { hasOpenParenCharacter } from "./has-open-paren-character";

test("hasOpenParenCharacter finds open parenthesis", () => {
  assert.equal(hasOpenParenCharacter("(abc"), true);
  assert.equal(hasOpenParenCharacter("a(bc"), true);
  assert.equal(hasOpenParenCharacter("abc"), false);
  assert.equal(hasOpenParenCharacter(""), false);
});
