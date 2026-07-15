import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isMediumMathematicalSpacePresent } from "./is-medium-mathematical-space-present";

test("detects medium mathematical space characters", () => {
  assert.equal(isMediumMathematicalSpacePresent(`a\u205Fb`), true);
  assert.equal(isMediumMathematicalSpacePresent("ab"), false);
  assert.equal(isMediumMathematicalSpacePresent(""), false);
});
