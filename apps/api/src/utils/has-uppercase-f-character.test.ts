import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseFCharacter } from "./has-uppercase-f-character";

test("returns false when the string has no uppercase F", () => {
  assert.equal(hasUppercaseFCharacter("agent playground"), false);
});

test("returns true when the string contains uppercase F", () => {
  assert.equal(hasUppercaseFCharacter("Forge"), true);
});
