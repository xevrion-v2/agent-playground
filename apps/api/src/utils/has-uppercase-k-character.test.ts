import assert from "node:assert/strict";
import test from "node:test";

import { hasUppercaseKCharacter } from "./has-uppercase-k-character";

test("returns false when the string has no uppercase K", () => {
  assert.equal(hasUppercaseKCharacter("agent playground"), false);
});

test("returns true when the string contains uppercase K", () => {
  assert.equal(hasUppercaseKCharacter("TaskKit"), true);
});
