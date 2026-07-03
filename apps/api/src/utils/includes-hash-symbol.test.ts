import test from "node:test";
import assert from "node:assert/strict";
import { includesHashSymbol } from "./includes-hash-symbol";

test("includesHashSymbol finds hash", () => {
  assert.equal(includesHashSymbol("a#b"), true);
  assert.equal(includesHashSymbol("abc"), false);
});
