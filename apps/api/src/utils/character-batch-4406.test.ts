import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseDCharacter } from "./has-uppercase-d-character";
import { hasLowercaseCCharacter } from "./has-lowercase-c-character";
import { hasUppercaseCCharacter } from "./has-uppercase-c-character";
import { hasLowercaseBCharacter } from "./has-lowercase-b-character";
import { hasUppercaseBCharacter } from "./has-uppercase-b-character";
import { hasEightDigitCharacter } from "./has-eight-digit-character";
import { hasSevenDigitCharacter } from "./has-seven-digit-character";
import { hasSixDigitCharacter } from "./has-six-digit-character";
import { hasFiveDigitCharacter } from "./has-five-digit-character";

const cases = [
  { name: "hasUppercaseDCharacter", fn: hasUppercaseDCharacter, positive: "D", negative: "xyz" },
  { name: "hasLowercaseCCharacter", fn: hasLowercaseCCharacter, positive: "c", negative: "xyz" },
  { name: "hasUppercaseCCharacter", fn: hasUppercaseCCharacter, positive: "C", negative: "xyz" },
  { name: "hasLowercaseBCharacter", fn: hasLowercaseBCharacter, positive: "b", negative: "xyz" },
  { name: "hasUppercaseBCharacter", fn: hasUppercaseBCharacter, positive: "B", negative: "xyz" },
  { name: "hasEightDigitCharacter", fn: hasEightDigitCharacter, positive: "8", negative: "xyz" },
  { name: "hasSevenDigitCharacter", fn: hasSevenDigitCharacter, positive: "7", negative: "xyz" },
  { name: "hasSixDigitCharacter", fn: hasSixDigitCharacter, positive: "6", negative: "xyz" },
  { name: "hasFiveDigitCharacter", fn: hasFiveDigitCharacter, positive: "5", negative: "xyz" },
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
