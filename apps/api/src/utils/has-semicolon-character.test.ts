import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasSemicolonCharacter } from "./has-semicolon-character";

test("detects semicolon characters", () => {
  assert.equal(hasSemicolonCharacter("path;to"), true);
  assert.equal(hasSemicolonCharacter("path/to"), false);
});
