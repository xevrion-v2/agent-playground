import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasBacktickCharacter } from "./has-backtick-character";

test("detects backtick characters", () => {
  assert.equal(hasBacktickCharacter("path`to"), true);
  assert.equal(hasBacktickCharacter("path/to"), false);
});
