import assert from "node:assert/strict";
import test from "node:test";

import { isRightToLeftIsolatePresent } from "./is-right-to-left-isolate-present";

test("returns true when a right-to-left isolate character is present", () => {
  assert.equal(isRightToLeftIsolatePresent("abc\u2067def"), true);
  assert.equal(isRightToLeftIsolatePresent("hello world"), false);
  assert.equal(isRightToLeftIsolatePresent("abc"), false);
});
