import assert from "node:assert/strict";
import test from "node:test";

import { hasLowercaseZCharacter } from "./has-lowercase-z-character";
import { hasUppercaseZCharacter } from "./has-uppercase-z-character";
import { hasLowercaseYCharacter } from "./has-lowercase-y-character";
import { hasUppercaseYCharacter } from "./has-uppercase-y-character";
import { hasUppercaseXCharacter } from "./has-uppercase-x-character";
import { hasLowercaseUCharacter } from "./has-lowercase-u-character";
import { hasUppercaseUCharacter } from "./has-uppercase-u-character";
import { hasLowercaseTCharacter } from "./has-lowercase-t-character";
import { hasUppercaseTCharacter } from "./has-uppercase-t-character";
import { hasLowercaseSCharacter } from "./has-lowercase-s-character";
import { hasUppercaseRCharacter } from "./has-uppercase-r-character";
import { hasLowercaseQCharacter } from "./has-lowercase-q-character";
import { hasUppercaseQCharacter } from "./has-uppercase-q-character";
import { hasLowercasePCharacter } from "./has-lowercase-p-character";
import { hasUppercasePCharacter } from "./has-uppercase-p-character";

const cases = [
  { name: "hasLowercaseZCharacter", fn: hasLowercaseZCharacter, positive: "z", negative: "abc" },
  { name: "hasUppercaseZCharacter", fn: hasUppercaseZCharacter, positive: "Z", negative: "abc" },
  { name: "hasLowercaseYCharacter", fn: hasLowercaseYCharacter, positive: "y", negative: "abc" },
  { name: "hasUppercaseYCharacter", fn: hasUppercaseYCharacter, positive: "Y", negative: "abc" },
  { name: "hasUppercaseXCharacter", fn: hasUppercaseXCharacter, positive: "X", negative: "abc" },
  { name: "hasLowercaseUCharacter", fn: hasLowercaseUCharacter, positive: "u", negative: "abc" },
  { name: "hasUppercaseUCharacter", fn: hasUppercaseUCharacter, positive: "U", negative: "abc" },
  { name: "hasLowercaseTCharacter", fn: hasLowercaseTCharacter, positive: "t", negative: "abc" },
  { name: "hasUppercaseTCharacter", fn: hasUppercaseTCharacter, positive: "T", negative: "abc" },
  { name: "hasLowercaseSCharacter", fn: hasLowercaseSCharacter, positive: "s", negative: "abc" },
  { name: "hasUppercaseRCharacter", fn: hasUppercaseRCharacter, positive: "R", negative: "abc" },
  { name: "hasLowercaseQCharacter", fn: hasLowercaseQCharacter, positive: "q", negative: "abc" },
  { name: "hasUppercaseQCharacter", fn: hasUppercaseQCharacter, positive: "Q", negative: "abc" },
  { name: "hasLowercasePCharacter", fn: hasLowercasePCharacter, positive: "p", negative: "abc" },
  { name: "hasUppercasePCharacter", fn: hasUppercasePCharacter, positive: "P", negative: "abc" },
];

test("returns true when the target character is present", () => {
  for (const c of cases) {
    assert.equal(c.fn(c.positive), true, c.name);
  }
});

test("returns false when the target character is absent", () => {
  for (const c of cases) {
    assert.equal(c.fn(c.negative), false, c.name);
  }
});
