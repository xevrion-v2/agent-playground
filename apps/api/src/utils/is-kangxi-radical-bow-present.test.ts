import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isKangxiRadicalBowPresent } from "./is-kangxi-radical-bow-present";

test("returns true when kangxi radical bow char is present", () => {
  assert.equal(isKangxiRadicalBowPresent("text ⼸"), true);
});

test("returns false when kangxi radical bow char is absent", () => {
  assert.equal(isKangxiRadicalBowPresent("just words"), false);
});

test("returns false for empty string", () => {
  assert.equal(isKangxiRadicalBowPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isKangxiRadicalBowPresent("⼸"), true);
});
