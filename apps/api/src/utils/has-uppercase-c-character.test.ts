import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseCCharacter } from "./has-uppercase-c-character";

test("returns false when the string has no uppercase C", () => {
  assert.equal(hasUppercaseCCharacter("agent playground"), false);
});

test("returns true when the string contains uppercase C", () => {
  assert.equal(hasUppercaseCCharacter("Cosmos"), true);
});
