import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isKangxiRadicalDottedTentPresent } from "./is-kangxi-radical-dotted-tent-present";

test("returns true when kangxi radical dotted tent char is present", () => {
  assert.equal(isKangxiRadicalDottedTentPresent("text ⽨"), true);
});

test("returns false when kangxi radical dotted tent char is absent", () => {
  assert.equal(isKangxiRadicalDottedTentPresent("normal text"), false);
});

test("returns false for empty string", () => {
  assert.equal(isKangxiRadicalDottedTentPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isKangxiRadicalDottedTentPresent("⽨"), true);
});
