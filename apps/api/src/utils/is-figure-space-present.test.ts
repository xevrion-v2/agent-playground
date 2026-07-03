import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isFigureSpacePresent } from "./is-figure-space-present";

test("detects figure space characters", () => {
  assert.equal(isFigureSpacePresent(`a\u2007b`), true);
  assert.equal(isFigureSpacePresent("ab"), false);
});
