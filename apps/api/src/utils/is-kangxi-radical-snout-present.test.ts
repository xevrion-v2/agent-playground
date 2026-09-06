import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isKangxiRadicalSnoutPresent } from "./is-kangxi-radical-snout-present";

test("returns true when kangxi radical snout char is present", () => {
  assert.equal(isKangxiRadicalSnoutPresent("text ⼹"), true);
});

test("returns false when kangxi radical snout char is absent", () => {
  assert.equal(isKangxiRadicalSnoutPresent("nothing here"), false);
});

test("returns false for empty string", () => {
  assert.equal(isKangxiRadicalSnoutPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isKangxiRadicalSnoutPresent("⼹"), true);
});
