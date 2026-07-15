import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isHairSpacePresent } from "./is-hair-space-present";

test("detects hair space characters", () => {
  assert.equal(isHairSpacePresent(`a\u200Ab`), true);
  assert.equal(isHairSpacePresent("ab"), false);
});
