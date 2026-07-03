import test from "node:test";
import assert from "node:assert/strict";
import { detectAmpersandSymbol } from "./detect-ampersand-symbol";

test("detectAmpersandSymbol finds ampersand", () => {
  assert.equal(detectAmpersandSymbol("&"), true);
  assert.equal(detectAmpersandSymbol("abc&xyz"), true);
  assert.equal(detectAmpersandSymbol("abc"), false);
});
