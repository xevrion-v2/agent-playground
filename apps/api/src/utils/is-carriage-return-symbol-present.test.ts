import assert from "node:assert/strict";
import test from "node:test";

import { isCarriageReturnSymbolPresent } from "./is-carriage-return-symbol-present";

test("returns true when the value contains a carriage return symbol", () => {
  assert.equal(isCarriageReturnSymbolPresent("left\rright"), true);
  assert.equal(isCarriageReturnSymbolPresent("\rleading"), true);
  assert.equal(isCarriageReturnSymbolPresent("trailing\r"), true);
});

test("returns false for adjacent control symbols and empty values", () => {
  assert.equal(isCarriageReturnSymbolPresent("left right"), false);
  assert.equal(isCarriageReturnSymbolPresent("left\tright"), false);
  assert.equal(isCarriageReturnSymbolPresent("left\nright"), false);
  assert.equal(isCarriageReturnSymbolPresent(""), false);
});
