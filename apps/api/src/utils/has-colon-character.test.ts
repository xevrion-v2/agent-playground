import assert from "node:assert/strict";
import test from "node:test";

import { hasColonCharacter } from "./has-colon-character";

test("detects colon characters", () => {
  assert.equal(hasColonCharacter("key:value"), true);
  assert.equal(hasColonCharacter(":"), true);
  assert.equal(hasColonCharacter("http://example.com"), true);
});

test("returns false when no colon character is present", () => {
  assert.equal(hasColonCharacter("key-value"), false);
  assert.equal(hasColonCharacter(""), false);
  assert.equal(hasColonCharacter("file.txt"), false);
  assert.equal(hasColonCharacter("path/to/file"), false);
});
