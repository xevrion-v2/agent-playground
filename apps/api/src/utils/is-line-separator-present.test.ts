import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isLineSeparatorPresent } from "./is-line-separator-present";

test("detects line separator characters", () => {
  assert.equal(isLineSeparatorPresent(`a\u2028b`), true);
  assert.equal(isLineSeparatorPresent("ab"), false);
});
