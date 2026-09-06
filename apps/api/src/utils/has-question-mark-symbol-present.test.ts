import assert from "node:assert/strict";
import test from "node:test";

import { hasQuestionMarkSymbolPresent } from "./has-question-mark-symbol-present";

test("returns false when the string has no question mark", () => {
  assert.equal(hasQuestionMarkSymbolPresent("agent playground"), false);
});

test("returns true when the string contains a question mark", () => {
  assert.equal(hasQuestionMarkSymbolPresent("Can we go?"), true);
});
