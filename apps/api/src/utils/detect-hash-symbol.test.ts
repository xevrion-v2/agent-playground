import test from "node:test";
import assert from "node:assert/strict";
import { detectHashSymbol } from "./detect-hash-symbol";

test("detectHashSymbol finds hash sign", () => {
  assert.equal(detectHashSymbol("#"), true);
  assert.equal(detectHashSymbol("a#b"), true);
  assert.equal(detectHashSymbol("abc"), false);
});
