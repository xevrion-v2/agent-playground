import assert from "node:assert/strict";
import test from "node:test";

import { hasExclamationCharacter } from "./has-exclamation-character";

test("returns true when the exclamation character is present", () => {
  assert.equal(hasExclamationCharacter("hello!"), true);
});

test("returns false when the exclamation character is absent", () => {
  assert.equal(hasExclamationCharacter("hello"), false);
});
