import assert from "node:assert/strict";
import test from "node:test";

import { isCrossPattyWithLeftCrossbarPresent } from "./is-cross-patty-with-left-crossbar-present";

test("returns true when the cross patty with left crossbar character is present", () => {
  assert.equal(isCrossPattyWithLeftCrossbarPresent(`abc\u2e51def`), true);
  assert.equal(isCrossPattyWithLeftCrossbarPresent("abcdef"), false);
  assert.equal(isCrossPattyWithLeftCrossbarPresent("abc"), false);
});
