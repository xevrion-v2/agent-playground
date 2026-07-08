import assert from "node:assert/strict";
import test from "node:test";

import { isAtSignSymbolPresent } from "./is-at-sign-symbol-present";

test("returns true when the at sign symbol is present", () => {
  assert.equal(isAtSignSymbolPresent("hello@example.com"), true);
  assert.equal(isAtSignSymbolPresent("hello world"), false);
  assert.equal(isAtSignSymbolPresent("abc"), false);
});
