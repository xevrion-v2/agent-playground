import assert from "node:assert/strict";
import test from "node:test";

import { isTopHalfRightParenthesisPresent } from "./is-top-half-right-parenthesis-present";

test("returns true when the top half right parenthesis character is present", () => {
  assert.equal(isTopHalfRightParenthesisPresent(`abc\u2e5adef`), true);
  assert.equal(isTopHalfRightParenthesisPresent("abcdef"), false);
  assert.equal(isTopHalfRightParenthesisPresent("abc"), false);
});
