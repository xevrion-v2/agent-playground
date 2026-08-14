import assert from "node:assert/strict";
import test from "node:test";

import { isNewlineSymbolPresent } from "./is-newline-symbol-present";

test("returns true when the value contains a newline symbol", () => {
  assert.equal(isNewlineSymbolPresent("left\nright"), true);
  assert.equal(isNewlineSymbolPresent("\nleading"), true);
  assert.equal(isNewlineSymbolPresent("trailing\n"), true);
});

test("returns false for adjacent control symbols and empty values", () => {
  assert.equal(isNewlineSymbolPresent("left right"), false);
  assert.equal(isNewlineSymbolPresent("left\tright"), false);
  assert.equal(isNewlineSymbolPresent("left\rright"), false);
  assert.equal(isNewlineSymbolPresent(""), false);
});
