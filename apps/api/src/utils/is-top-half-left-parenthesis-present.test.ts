import assert from "node:assert/strict";
import test from "node:test";

import { isTopHalfLeftParenthesisPresent } from "./is-top-half-left-parenthesis-present";

test("returns true when the top half left parenthesis character is present", () => {
  assert.equal(isTopHalfLeftParenthesisPresent(`abc\u2e59def`), true);
  assert.equal(isTopHalfLeftParenthesisPresent("abcdef"), false);
  assert.equal(isTopHalfLeftParenthesisPresent("abc"), false);
});
