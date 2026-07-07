import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseDCharacter } from "./has-uppercase-d-character";

test("returns false when the string has no uppercase D", () => {
  assert.equal(hasUppercaseDCharacter("agent playground"), false);
});

test("returns true when the string contains uppercase D", () => {
  assert.equal(hasUppercaseDCharacter("Delta"), true);
});
