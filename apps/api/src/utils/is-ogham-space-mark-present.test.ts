import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isOghamSpaceMarkPresent } from "./is-ogham-space-mark-present";

test("detects ogham space mark characters", () => {
  assert.equal(isOghamSpaceMarkPresent(`a\u1680b`), true);
  assert.equal(isOghamSpaceMarkPresent("ab"), false);
  assert.equal(isOghamSpaceMarkPresent(""), false);
});
