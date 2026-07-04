import assert from "node:assert/strict";
import test from "node:test";

import { hasSlashCharacter } from "./has-slash-character";

test("detects slash characters", () => {
  assert.equal(hasSlashCharacter("path/to"), true);
  assert.equal(hasSlashCharacter("/"), true);
  assert.equal(hasSlashCharacter("https://example.com"), true);
});

test("returns false when no slash character is present", () => {
  assert.equal(hasSlashCharacter("path-to"), false);
  assert.equal(hasSlashCharacter(""), false);
  assert.equal(hasSlashCharacter("file.txt"), false);
  assert.equal(hasSlashCharacter("key:value"), false);
  assert.equal(hasSlashCharacter("path\\to"), false);
});
