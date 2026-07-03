import test from "node:test";
import assert from "node:assert/strict";
import { detectTildeSymbol } from "./detect-tilde-symbol";

test("detectTildeSymbol finds tilde sign", () => {
  assert.equal(detectTildeSymbol("~"), true);
  assert.equal(detectTildeSymbol("a~b"), true);
  assert.equal(detectTildeSymbol("abc"), false);
  assert.equal(detectTildeSymbol(""), false);
});
