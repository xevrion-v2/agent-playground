import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isKangxiRadicalSicknessPresent } from "./is-kangxi-radical-sickness-present";

test("returns true when kangxi radical sickness char is present", () => {
  assert.equal(isKangxiRadicalSicknessPresent("text ⽧"), true);
});

test("returns false when kangxi radical sickness char is absent", () => {
  assert.equal(isKangxiRadicalSicknessPresent("normal text"), false);
});

test("returns false for empty string", () => {
  assert.equal(isKangxiRadicalSicknessPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isKangxiRadicalSicknessPresent("⽧"), true);
});
