import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseHCharacter } from "./has-uppercase-h-character";

test("returns false when the string has no uppercase H", () => {
  assert.equal(hasUppercaseHCharacter("agent playground"), false);
});

test("returns true when the string contains uppercase H", () => {
  assert.equal(hasUppercaseHCharacter("Hello"), true);
});
