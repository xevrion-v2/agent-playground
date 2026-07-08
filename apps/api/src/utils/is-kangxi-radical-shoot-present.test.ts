import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isKangxiRadicalShootPresent } from "./is-kangxi-radical-shoot-present";

test("returns true when kangxi radical shoot char is present", () => {
  assert.equal(isKangxiRadicalShootPresent("text ⼷"), true);
});

test("returns false when kangxi radical shoot char is absent", () => {
  assert.equal(isKangxiRadicalShootPresent("normal text"), false);
});

test("returns false for empty string", () => {
  assert.equal(isKangxiRadicalShootPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isKangxiRadicalShootPresent("⼷"), true);
});
