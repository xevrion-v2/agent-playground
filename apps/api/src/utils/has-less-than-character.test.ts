import assert from "node:assert/strict";
import test from "node:test";

import { hasLessThanCharacter } from "./has-less-than-character";

test("returns true when the less-than character is present", () => {
  assert.equal(hasLessThanCharacter("1 < 2"), true);
});

test("returns false when the less-than character is absent", () => {
  assert.equal(hasLessThanCharacter("1 > 2"), false);
});
