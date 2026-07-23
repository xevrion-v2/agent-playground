import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isKangxiRadicalBristlePresent } from "./is-kangxi-radical-bristle-present";

test("returns true when kangxi radical bristle char is present", () => {
  assert.equal(isKangxiRadicalBristlePresent("text ⼺"), true);
});

test("returns false when kangxi radical bristle char is absent", () => {
  assert.equal(isKangxiRadicalBristlePresent("plain text"), false);
});

test("returns false for empty string", () => {
  assert.equal(isKangxiRadicalBristlePresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isKangxiRadicalBristlePresent("⼺"), true);
});
