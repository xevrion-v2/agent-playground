import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseBCharacter } from "./has-uppercase-b-character";

test("returns false when the string has no uppercase B", () => {
  assert.equal(hasUppercaseBCharacter("alpha"), false);
});

test("returns true when the string contains uppercase B", () => {
  assert.equal(hasUppercaseBCharacter("Beta"), true);
});
