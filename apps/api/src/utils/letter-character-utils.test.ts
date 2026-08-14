import assert from "node:assert/strict";
import test from "node:test";

import { hasLowercasePCharacter } from "./has-lowercase-p-character";
import { hasLowercaseQCharacter } from "./has-lowercase-q-character";
import { hasLowercaseSCharacter } from "./has-lowercase-s-character";
import { hasLowercaseTCharacter } from "./has-lowercase-t-character";
import { hasLowercaseUCharacter } from "./has-lowercase-u-character";
import { hasLowercaseYCharacter } from "./has-lowercase-y-character";
import { hasLowercaseZCharacter } from "./has-lowercase-z-character";
import { hasUppercasePCharacter } from "./has-uppercase-p-character";
import { hasUppercaseQCharacter } from "./has-uppercase-q-character";
import { hasUppercaseRCharacter } from "./has-uppercase-r-character";
import { hasUppercaseTCharacter } from "./has-uppercase-t-character";
import { hasUppercaseUCharacter } from "./has-uppercase-u-character";
import { hasUppercaseXCharacter } from "./has-uppercase-x-character";
import { hasUppercaseYCharacter } from "./has-uppercase-y-character";
import { hasUppercaseZCharacter } from "./has-uppercase-z-character";

test("detects lowercase letter utilities", () => {
  assert.equal(hasLowercaseZCharacter("z"), true);
  assert.equal(hasLowercaseYCharacter("y"), true);
  assert.equal(hasLowercaseUCharacter("u"), true);
  assert.equal(hasLowercaseTCharacter("t"), true);
  assert.equal(hasLowercaseSCharacter("s"), true);
  assert.equal(hasLowercaseQCharacter("q"), true);
  assert.equal(hasLowercasePCharacter("p"), true);
});

test("detects uppercase letter utilities", () => {
  assert.equal(hasUppercaseZCharacter("Z"), true);
  assert.equal(hasUppercaseYCharacter("Y"), true);
  assert.equal(hasUppercaseXCharacter("X"), true);
  assert.equal(hasUppercaseUCharacter("U"), true);
  assert.equal(hasUppercaseTCharacter("T"), true);
  assert.equal(hasUppercaseRCharacter("R"), true);
  assert.equal(hasUppercaseQCharacter("Q"), true);
  assert.equal(hasUppercasePCharacter("P"), true);
});

test("returns false when the target letter is absent", () => {
  assert.equal(hasLowercaseZCharacter("a"), false);
  assert.equal(hasUppercaseZCharacter("a"), false);
  assert.equal(hasLowercaseYCharacter("a"), false);
  assert.equal(hasUppercaseYCharacter("a"), false);
  assert.equal(hasUppercaseXCharacter("a"), false);
  assert.equal(hasLowercaseUCharacter("a"), false);
  assert.equal(hasUppercaseUCharacter("a"), false);
  assert.equal(hasLowercaseTCharacter("a"), false);
  assert.equal(hasUppercaseTCharacter("a"), false);
  assert.equal(hasLowercaseSCharacter("a"), false);
  assert.equal(hasUppercaseRCharacter("a"), false);
  assert.equal(hasLowercaseQCharacter("a"), false);
  assert.equal(hasUppercaseQCharacter("a"), false);
  assert.equal(hasLowercasePCharacter("a"), false);
  assert.equal(hasUppercasePCharacter("a"), false);
});
