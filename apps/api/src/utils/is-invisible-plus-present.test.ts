import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isInvisiblePlusPresent } from "./is-invisible-plus-present";

test("detects invisible plus characters", () => {
  assert.equal(isInvisiblePlusPresent(`a\u2064b`), true);
  assert.equal(isInvisiblePlusPresent("ab"), false);
  assert.equal(isInvisiblePlusPresent(""), false);
});
