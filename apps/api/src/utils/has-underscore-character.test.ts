import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasUnderscoreCharacter } from "./has-underscore-character";

test("detects underscore characters", () => {
  assert.equal(hasUnderscoreCharacter("path_to"), true);
  assert.equal(hasUnderscoreCharacter("path/to"), false);
});
