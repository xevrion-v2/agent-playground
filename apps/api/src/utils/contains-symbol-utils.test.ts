import assert from "node:assert/strict";
import test from "node:test";

import { containsCommaSymbol } from "./contains-comma-symbol";
import { containsColonSymbol } from "./contains-colon-symbol";
import { containsQuestionMarkSymbol } from "./contains-question-mark-symbol";
import { containsSemicolonSymbol } from "./contains-semicolon-symbol";
import { containsUnderscoreSymbol } from "./contains-underscore-symbol";

test("detects contains-style symbol utilities", () => {
  assert.equal(containsUnderscoreSymbol("agent_playground"), true);
  assert.equal(containsQuestionMarkSymbol("go?"), true);
  assert.equal(containsCommaSymbol("alpha, beta"), true);
  assert.equal(containsSemicolonSymbol("alpha; beta"), true);
  assert.equal(containsColonSymbol("alpha: beta"), true);
});

test("returns false when the symbol is absent", () => {
  assert.equal(containsUnderscoreSymbol("agent playground"), false);
  assert.equal(containsQuestionMarkSymbol("go"), false);
  assert.equal(containsCommaSymbol("alpha beta"), false);
  assert.equal(containsSemicolonSymbol("alpha beta"), false);
  assert.equal(containsColonSymbol("alpha beta"), false);
});
