import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseOCharacter } from "./has-uppercase-o-character";
import { hasLowercaseNCharacter } from "./has-lowercase-n-character";
import { hasUppercaseNCharacter } from "./has-uppercase-n-character";
import { hasLowercaseMCharacter } from "./has-lowercase-m-character";
import { hasUppercaseMCharacter } from "./has-uppercase-m-character";
import { hasUppercaseKCharacter } from "./has-uppercase-k-character";
import { hasLowercaseJCharacter } from "./has-lowercase-j-character";
import { hasUppercaseJCharacter } from "./has-uppercase-j-character";
import { hasLowercaseICharacter } from "./has-lowercase-i-character";
import { hasUppercaseICharacter } from "./has-uppercase-i-character";
import { hasUppercaseHCharacter } from "./has-uppercase-h-character";
import { hasLowercaseGCharacter } from "./has-lowercase-g-character";

const cases = [
  { name: "hasUppercaseOCharacter", fn: hasUppercaseOCharacter, positive: "O", negative: "abc" },
  { name: "hasLowercaseNCharacter", fn: hasLowercaseNCharacter, positive: "n", negative: "abc" },
  { name: "hasUppercaseNCharacter", fn: hasUppercaseNCharacter, positive: "N", negative: "abc" },
  { name: "hasLowercaseMCharacter", fn: hasLowercaseMCharacter, positive: "m", negative: "abc" },
  { name: "hasUppercaseMCharacter", fn: hasUppercaseMCharacter, positive: "M", negative: "abc" },
  { name: "hasUppercaseKCharacter", fn: hasUppercaseKCharacter, positive: "K", negative: "abc" },
  { name: "hasLowercaseJCharacter", fn: hasLowercaseJCharacter, positive: "j", negative: "abc" },
  { name: "hasUppercaseJCharacter", fn: hasUppercaseJCharacter, positive: "J", negative: "abc" },
  { name: "hasLowercaseICharacter", fn: hasLowercaseICharacter, positive: "i", negative: "abc" },
  { name: "hasUppercaseICharacter", fn: hasUppercaseICharacter, positive: "I", negative: "abc" },
  { name: "hasUppercaseHCharacter", fn: hasUppercaseHCharacter, positive: "H", negative: "abc" },
  { name: "hasLowercaseGCharacter", fn: hasLowercaseGCharacter, positive: "g", negative: "abc" },
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
