import assert from "node:assert/strict";
import test from "node:test";

import { isFormFeedSymbolPresent } from "./is-form-feed-symbol-present";

test("returns true when the value contains a form feed symbol", () => {
  assert.equal(isFormFeedSymbolPresent("left\fright"), true);
  assert.equal(isFormFeedSymbolPresent("\fleading"), true);
  assert.equal(isFormFeedSymbolPresent("trailing\f"), true);
});

test("returns false for adjacent control symbols and empty values", () => {
  assert.equal(isFormFeedSymbolPresent("left right"), false);
  assert.equal(isFormFeedSymbolPresent("left\tright"), false);
  assert.equal(isFormFeedSymbolPresent("left\nright"), false);
  assert.equal(isFormFeedSymbolPresent("left\rright"), false);
  assert.equal(isFormFeedSymbolPresent(""), false);
});
