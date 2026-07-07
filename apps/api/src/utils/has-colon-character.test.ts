import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasColonCharacter } from "./has-colon-character";

test("detects colon characters", () => {
  assert.equal(hasColonCharacter("a:b"), true);
  assert.equal(hasColonCharacter("ab"), false);
});
