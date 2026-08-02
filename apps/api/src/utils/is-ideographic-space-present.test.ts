import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isIdeographicSpacePresent } from "./is-ideographic-space-present";

test("detects ideographic space characters", () => {
  assert.equal(isIdeographicSpacePresent(`a\u3000b`), true);
  assert.equal(isIdeographicSpacePresent("ab"), false);
});
