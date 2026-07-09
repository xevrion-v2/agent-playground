import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isKangxiRadicalWhitePresent } from "./is-kangxi-radical-white-present";

test("returns true when kangxi radical white char is present", () => {
  assert.equal(isKangxiRadicalWhitePresent("text ⽩"), true);
});

test("returns false when kangxi radical white char is absent", () => {
  assert.equal(isKangxiRadicalWhitePresent("normal text"), false);
});

test("returns false for empty string", () => {
  assert.equal(isKangxiRadicalWhitePresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isKangxiRadicalWhitePresent("⽩"), true);
});
