import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isInvisibleSeparatorPresent } from "./is-invisible-separator-present";

test("detects invisible separator characters", () => {
  assert.equal(isInvisibleSeparatorPresent(`a\u2063b`), true);
  assert.equal(isInvisibleSeparatorPresent("ab"), false);
  assert.equal(isInvisibleSeparatorPresent(""), false);
});
