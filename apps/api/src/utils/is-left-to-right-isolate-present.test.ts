import assert from "node:assert/strict";
import test from "node:test";

import { isLeftToRightIsolatePresent } from "./is-left-to-right-isolate-present";

test("returns true when a left-to-right isolate character is present", () => {
  assert.equal(isLeftToRightIsolatePresent("abc\u2066def"), true);
  assert.equal(isLeftToRightIsolatePresent("hello world"), false);
  assert.equal(isLeftToRightIsolatePresent("abc"), false);
});
