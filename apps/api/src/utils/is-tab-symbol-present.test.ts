import assert from "node:assert/strict";
import test from "node:test";

import { isTabSymbolPresent } from "./is-tab-symbol-present";

test("returns true when the value contains a tab symbol", () => {
  assert.equal(isTabSymbolPresent("left\tright"), true);
  assert.equal(isTabSymbolPresent("\tleading"), true);
  assert.equal(isTabSymbolPresent("trailing\t"), true);
});

test("returns false for adjacent whitespace and empty values", () => {
  assert.equal(isTabSymbolPresent("left right"), false);
  assert.equal(isTabSymbolPresent("left\nright"), false);
  assert.equal(isTabSymbolPresent("left\rright"), false);
  assert.equal(isTabSymbolPresent(""), false);
});
