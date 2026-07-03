import assert from "node:assert/strict";
import test from "node:test";

import { detectAmpersandSymbol } from "./detect-ampersand-symbol";
import { detectCaretSymbol } from "./detect-caret-symbol";
import { detectHashSymbol } from "./detect-hash-symbol";
import { detectPipeSymbol } from "./detect-pipe-symbol";
import { detectTildeSymbol } from "./detect-tilde-symbol";

test("detects ampersand, hash, caret, tilde and pipe symbols", () => {
  assert.equal(detectAmpersandSymbol("rock & roll"), true);
  assert.equal(detectHashSymbol("issue #4652"), true);
  assert.equal(detectCaretSymbol("2 ^ 3"), true);
  assert.equal(detectTildeSymbol("home ~ user"), true);
  assert.equal(detectPipeSymbol("a | b"), true);
});

test("returns false when none of the symbols are present", () => {
  assert.equal(detectAmpersandSymbol("agent playground"), false);
  assert.equal(detectHashSymbol("agent playground"), false);
  assert.equal(detectCaretSymbol("agent playground"), false);
  assert.equal(detectTildeSymbol("agent playground"), false);
  assert.equal(detectPipeSymbol("agent playground"), false);
});
