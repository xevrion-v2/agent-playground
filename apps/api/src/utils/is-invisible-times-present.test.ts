import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isInvisibleTimesPresent } from "./is-invisible-times-present";

test("detects invisible times characters", () => {
  assert.equal(isInvisibleTimesPresent(`a\u2062b`), true);
  assert.equal(isInvisibleTimesPresent("ab"), false);
  assert.equal(isInvisibleTimesPresent(""), false);
});
