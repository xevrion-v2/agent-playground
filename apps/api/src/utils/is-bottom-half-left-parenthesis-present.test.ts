import assert from "node:assert/strict";
import test from "node:test";

import { isBottomHalfLeftParenthesisPresent } from "./is-bottom-half-left-parenthesis-present";

test("returns true when the bottom half left parenthesis character is present", () => {
  assert.equal(isBottomHalfLeftParenthesisPresent(`abc\u2e5bdef`), true);
  assert.equal(isBottomHalfLeftParenthesisPresent("abcdef"), false);
  assert.equal(isBottomHalfLeftParenthesisPresent("abc"), false);
});
