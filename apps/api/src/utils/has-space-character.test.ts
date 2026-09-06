import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasSpaceCharacter } from "./has-space-character";

test("detects space characters", () => {
  assert.equal(hasSpaceCharacter("a b"), true);
  assert.equal(hasSpaceCharacter("ab"), false);
});
