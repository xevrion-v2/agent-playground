import assert from "node:assert/strict";
import test from "node:test";

import { hasHyphenCharacter } from "./has-hyphen-character";

test("returns true when the hyphen character is present", () => {
  assert.equal(hasHyphenCharacter("a-b"), true);
});

test("returns false when the hyphen character is absent", () => {
  assert.equal(hasHyphenCharacter("ab"), false);
});
