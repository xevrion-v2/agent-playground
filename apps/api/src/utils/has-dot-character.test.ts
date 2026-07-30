import assert from "node:assert/strict";
import test from "node:test";

import { hasDotCharacter } from "./has-dot-character";

test("detects dot characters", () => {
  assert.equal(hasDotCharacter("file.txt"), true);
  assert.equal(hasDotCharacter("."), true);
  assert.equal(hasDotCharacter("a.b.c"), true);
});

test("returns false when no dot character is present", () => {
  assert.equal(hasDotCharacter("file-txt"), false);
  assert.equal(hasDotCharacter(""), false);
  assert.equal(hasDotCharacter("colon:value"), false);
  assert.equal(hasDotCharacter("path/to/file"), false);
});
