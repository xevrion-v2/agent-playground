import test from "node:test";
import assert from "node:assert/strict";
import { detectPipeSymbol } from "./detect-pipe-symbol";

test("detectPipeSymbol finds pipe sign", () => {
  assert.equal(detectPipeSymbol("|"), true);
  assert.equal(detectPipeSymbol("a|b"), true);
  assert.equal(detectPipeSymbol("abc"), false);
  assert.equal(detectPipeSymbol(""), false);
});
