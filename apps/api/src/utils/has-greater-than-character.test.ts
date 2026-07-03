import assert from "node:assert/strict";
import test from "node:test";

import { hasGreaterThanCharacter } from "./has-greater-than-character";

test("returns true when the greater-than character is present", () => {
  assert.equal(hasGreaterThanCharacter("2 > 1"), true);
});

test("returns false when the greater-than character is absent", () => {
  assert.equal(hasGreaterThanCharacter("1 < 2"), false);
});
