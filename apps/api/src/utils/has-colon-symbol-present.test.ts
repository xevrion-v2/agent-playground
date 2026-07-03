import assert from "node:assert/strict";
import test from "node:test";

import { hasColonSymbolPresent } from "./has-colon-symbol-present";

test("returns false when the string has no colon", () => {
  assert.equal(hasColonSymbolPresent("agent playground"), false);
});

test("returns true when the string contains a colon", () => {
  assert.equal(hasColonSymbolPresent("alpha: beta"), true);
});
