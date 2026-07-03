import assert from "node:assert/strict";
import test from "node:test";

import { hasHashSymbolPresent } from "./has-hash-symbol-present";

test("returns false when the string has no hash symbol", () => {
  assert.equal(hasHashSymbolPresent("agent playground"), false);
});

test("returns true when the string contains a hash symbol", () => {
  assert.equal(hasHashSymbolPresent("topic #1"), true);
});
