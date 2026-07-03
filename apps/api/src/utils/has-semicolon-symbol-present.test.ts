import assert from "node:assert/strict";
import test from "node:test";

import { hasSemicolonSymbolPresent } from "./has-semicolon-symbol-present";

test("returns false when the string has no semicolon", () => {
  assert.equal(hasSemicolonSymbolPresent("agent playground"), false);
});

test("returns true when the string contains a semicolon", () => {
  assert.equal(hasSemicolonSymbolPresent("alpha; beta"), true);
});
