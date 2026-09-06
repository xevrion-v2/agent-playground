import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isKangxiRadicalBoltOfClothPresent } from "./is-kangxi-radical-bolt-of-cloth-present";

test("returns true when kangxi radical bolt of cloth char is present", () => {
  assert.equal(isKangxiRadicalBoltOfClothPresent("text ⽦"), true);
});

test("returns false when kangxi radical bolt of cloth char is absent", () => {
  assert.equal(isKangxiRadicalBoltOfClothPresent("normal text"), false);
});

test("returns false for empty string", () => {
  assert.equal(isKangxiRadicalBoltOfClothPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isKangxiRadicalBoltOfClothPresent("⽦"), true);
});
