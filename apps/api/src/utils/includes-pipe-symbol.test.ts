import test from "node:test";
import assert from "node:assert/strict";
import { includesPipeSymbol } from "./includes-pipe-symbol";

test("includesPipeSymbol finds pipe", () => {
  assert.equal(includesPipeSymbol("a|b"), true);
  assert.equal(includesPipeSymbol("abc"), false);
});
