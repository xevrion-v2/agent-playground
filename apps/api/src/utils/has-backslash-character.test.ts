import assert from "node:assert/strict";
import test from "node:test";

import { hasBackslashCharacter } from "./has-backslash-character";

test("returns true when the backslash character is present", () => {
  assert.equal(hasBackslashCharacter("path\\to"), true);
});

test("returns false when the backslash character is absent", () => {
  assert.equal(hasBackslashCharacter("path/to"), false);
});
