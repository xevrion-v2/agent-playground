import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasSlashCharacter } from "./has-slash-character";

test("detects slash characters", () => {
  assert.equal(hasSlashCharacter("path/to"), true);
  assert.equal(hasSlashCharacter("pathto"), false);
});
