import assert from "node:assert/strict";
import test from "node:test";

import { hasCommaSymbolPresent } from "./has-comma-symbol-present";

test("returns false when the string has no comma", () => {
  assert.equal(hasCommaSymbolPresent("agent playground"), false);
});

test("returns true when the string contains a comma", () => {
  assert.equal(hasCommaSymbolPresent("alpha, beta"), true);
});
