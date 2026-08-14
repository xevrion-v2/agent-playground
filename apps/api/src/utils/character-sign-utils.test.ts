import assert from "node:assert/strict";
import test from "node:test";

import { hasAtSignCharacter } from "./has-at-sign-character";
import { hasBangCharacter } from "./has-bang-character";
import { hasDotCharacter } from "./has-dot-character";
import { hasDollarSignCharacter } from "./has-dollar-sign-character";
import { hasEqualsSignCharacter } from "./has-equals-sign-character";
import { hasForwardSlashCharacter } from "./has-forward-slash-character";
import { hasMinusSignCharacter } from "./has-minus-sign-character";
import { hasOpenParenCharacter } from "./has-open-paren-character";
import { hasPercentSignCharacter } from "./has-percent-sign-character";
import { hasPlusSignCharacter } from "./has-plus-sign-character";

test("detects the sign and punctuation characters", () => {
  assert.equal(hasBangCharacter("wow!"), true);
  assert.equal(hasDotCharacter("v1.0"), true);
  assert.equal(hasMinusSignCharacter("x-y"), true);
  assert.equal(hasDollarSignCharacter("$100"), true);
  assert.equal(hasForwardSlashCharacter("a/b"), true);
  assert.equal(hasOpenParenCharacter("(a)"), true);
  assert.equal(hasEqualsSignCharacter("a=b"), true);
  assert.equal(hasPlusSignCharacter("a+b"), true);
  assert.equal(hasPercentSignCharacter("50%"), true);
  assert.equal(hasAtSignCharacter("user@example.com"), true);
});

test("returns false when the character is absent", () => {
  assert.equal(hasBangCharacter("wow"), false);
  assert.equal(hasDotCharacter("v1-0"), false);
  assert.equal(hasMinusSignCharacter("xy"), false);
  assert.equal(hasDollarSignCharacter("100"), false);
  assert.equal(hasForwardSlashCharacter("ab"), false);
  assert.equal(hasOpenParenCharacter("a)"), false);
  assert.equal(hasEqualsSignCharacter("ab"), false);
  assert.equal(hasPlusSignCharacter("ab"), false);
  assert.equal(hasPercentSignCharacter("50"), false);
  assert.equal(hasAtSignCharacter("userexample.com"), false);
});
