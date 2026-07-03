import test from "node:test";
import assert from "node:assert/strict";
import { includesCaretSymbol } from "./includes-caret-symbol";

test("includesCaretSymbol finds caret", () => {
  assert.equal(includesCaretSymbol("a^b"), true);
  assert.equal(includesCaretSymbol("abc"), false);
});
