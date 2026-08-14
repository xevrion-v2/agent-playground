import assert from "node:assert/strict";
import test from "node:test";

import { hasCommaCharacter } from "./has-comma-character";

test("returns true when the comma character is present", () => {
  assert.equal(hasCommaCharacter("a, b"), true);
});

test("returns false when the comma character is absent", () => {
  assert.equal(hasCommaCharacter("ab"), false);
});
