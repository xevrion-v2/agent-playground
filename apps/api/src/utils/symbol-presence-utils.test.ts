import assert from "node:assert/strict";
import test from "node:test";

import { includesAmpersandSymbol } from "./includes-ampersand-symbol";
import { includesCaretSymbol } from "./includes-caret-symbol";
import { includesHashSymbol } from "./includes-hash-symbol";
import { includesPipeSymbol } from "./includes-pipe-symbol";
import { includesTildeSymbol } from "./includes-tilde-symbol";
import { isAmpersandSymbolPresent } from "./is-ampersand-symbol-present";
import { isCaretSymbolPresent } from "./is-caret-symbol-present";
import { isPipeSymbolPresent } from "./is-pipe-symbol-present";
import { isTildeSymbolPresent } from "./is-tilde-symbol-present";
import { isUnderscoreSymbolPresent } from "./is-underscore-symbol-present";

test("checks underscore, ampersand, caret, tilde and pipe symbols", () => {
  assert.equal(isUnderscoreSymbolPresent("agent_playground"), true);
  assert.equal(isUnderscoreSymbolPresent("agent playground"), false);
  assert.equal(isAmpersandSymbolPresent("rock & roll"), true);
  assert.equal(isCaretSymbolPresent("2 ^ 3"), true);
  assert.equal(isTildeSymbolPresent("home ~ user"), true);
  assert.equal(isPipeSymbolPresent("a | b"), true);
});

test("checks includes-style symbol utilities", () => {
  assert.equal(includesAmpersandSymbol("rock & roll"), true);
  assert.equal(includesHashSymbol("issue #4714"), true);
  assert.equal(includesCaretSymbol("2 ^ 3"), true);
  assert.equal(includesTildeSymbol("home ~ user"), true);
  assert.equal(includesPipeSymbol("a | b"), true);
});
