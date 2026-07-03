import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNarrowNoBreakSpacePresent } from "./is-narrow-no-break-space-present";

test("detects narrow no-break space characters", () => {
  assert.equal(isNarrowNoBreakSpacePresent(`a\u202Fb`), true);
  assert.equal(isNarrowNoBreakSpacePresent("ab"), false);
  assert.equal(isNarrowNoBreakSpacePresent(""), false);
});
