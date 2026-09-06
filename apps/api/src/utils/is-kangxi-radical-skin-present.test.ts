import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isKangxiRadicalSkinPresent } from "./is-kangxi-radical-skin-present";

test("returns true when kangxi radical skin char is present", () => {
  assert.equal(isKangxiRadicalSkinPresent("text ⽪"), true);
});

test("returns false when kangxi radical skin char is absent", () => {
  assert.equal(isKangxiRadicalSkinPresent("normal text"), false);
});

test("returns false for empty string", () => {
  assert.equal(isKangxiRadicalSkinPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isKangxiRadicalSkinPresent("⽪"), true);
});
