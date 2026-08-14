import assert from "node:assert/strict";
import test from "node:test";

import { isVerticalTabSymbolPresent } from "./is-vertical-tab-symbol-present";

test("returns true when the value contains a vertical tab symbol", () => {
  assert.equal(isVerticalTabSymbolPresent("left\vright"), true);
  assert.equal(isVerticalTabSymbolPresent("\vleading"), true);
  assert.equal(isVerticalTabSymbolPresent("trailing\v"), true);
});

test("returns false for adjacent control symbols and empty values", () => {
  assert.equal(isVerticalTabSymbolPresent("left right"), false);
  assert.equal(isVerticalTabSymbolPresent("left\tright"), false);
  assert.equal(isVerticalTabSymbolPresent("left\nright"), false);
  assert.equal(isVerticalTabSymbolPresent("left\rright"), false);
  assert.equal(isVerticalTabSymbolPresent("left\fright"), false);
  assert.equal(isVerticalTabSymbolPresent(""), false);
});
