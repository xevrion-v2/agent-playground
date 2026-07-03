import test from "node:test";
import assert from "node:assert/strict";
import { detectCaretSymbol } from "./detect-caret-symbol";

test("detectCaretSymbol finds caret sign", () => {
  assert.equal(detectCaretSymbol("^"), true);
  assert.equal(detectCaretSymbol("a^b"), true);
  assert.equal(detectCaretSymbol("abc"), false);
  assert.equal(detectCaretSymbol(""), false);
});
