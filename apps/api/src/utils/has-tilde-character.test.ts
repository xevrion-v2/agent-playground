import assert from "node:assert/strict";
import test from "node:test";

import { hasTildeCharacter } from "./has-tilde-character";

test("returns true when the tilde character is present", () => {
  assert.equal(hasTildeCharacter("a ~ b"), true);
});

test("returns false when the tilde character is absent", () => {
  assert.equal(hasTildeCharacter("a - b"), false);
});
