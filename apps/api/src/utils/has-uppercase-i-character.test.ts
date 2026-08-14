import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseICharacter } from "./has-uppercase-i-character";

test("returns false when the string has no uppercase I", () => {
  assert.equal(hasUppercaseICharacter("agent playground"), false);
});

test("returns true when the string contains uppercase I", () => {
  assert.equal(hasUppercaseICharacter("Icarus"), true);
});
