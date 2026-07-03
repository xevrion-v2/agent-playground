import test from "node:test";
import assert from "node:assert/strict";
import { includesAmpersandSymbol } from "./includes-ampersand-symbol";

test("includesAmpersandSymbol finds ampersand", () => {
  assert.equal(includesAmpersandSymbol("a&b"), true);
  assert.equal(includesAmpersandSymbol("abc"), false);
});
