import test from "node:test";
import assert from "node:assert/strict";
import { includesTildeSymbol } from "./includes-tilde-symbol";

test("includesTildeSymbol finds tilde", () => {
  assert.equal(includesTildeSymbol("a~b"), true);
  assert.equal(includesTildeSymbol("abc"), false);
});
