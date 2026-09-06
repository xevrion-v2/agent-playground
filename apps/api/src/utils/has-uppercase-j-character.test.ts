import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseJCharacter } from "./has-uppercase-j-character";

test("returns false when the string has no uppercase J", () => {
  assert.equal(hasUppercaseJCharacter("agent playground"), false);
});

test("returns true when the string contains uppercase J", () => {
  assert.equal(hasUppercaseJCharacter("Jupiter"), true);
});
