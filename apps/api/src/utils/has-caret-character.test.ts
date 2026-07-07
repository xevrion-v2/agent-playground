import assert from "node:assert/strict";
import test from "node:test";

import { hasCaretCharacter } from "./has-caret-character";

test("returns true when the caret character is present", () => {
  assert.equal(hasCaretCharacter("2 ^ 1"), true);
});

test("returns false when the caret character is absent", () => {
  assert.equal(hasCaretCharacter("2 + 1"), false);
});
