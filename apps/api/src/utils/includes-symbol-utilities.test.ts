import test from "node:test";
import assert from "node:assert/strict";
import { includesAmpersandSymbol } from "./includes-ampersand-symbol";
import { includesCaretSymbol } from "./includes-caret-symbol";
import { includesHashSymbol } from "./includes-hash-symbol";
import { includesPipeSymbol } from "./includes-pipe-symbol";
import { includesTildeSymbol } from "./includes-tilde-symbol";

test("includesPipeSymbol finds pipe", () => {
  assert.equal(includesPipeSymbol("|"), true);
  assert.equal(includesPipeSymbol("a|b"), true);
  assert.equal(includesPipeSymbol("not"), false);
});

test("includesHashSymbol finds hash", () => {
  assert.equal(includesHashSymbol("#"), true);
  assert.equal(includesHashSymbol("x#y"), true);
  assert.equal(includesHashSymbol("x y"), false);
});

test("includesCaretSymbol finds caret", () => {
  assert.equal(includesCaretSymbol("x^y"), true);
  assert.equal(includesCaretSymbol("x"), false);
});

test("includesTildeSymbol finds tilde", () => {
  assert.equal(includesTildeSymbol("x~y"), true);
  assert.equal(includesTildeSymbol("xy"), false);
});

test("includesAmpersandSymbol still works", () => {
  assert.equal(includesAmpersandSymbol("&"), true);
  assert.equal(includesAmpersandSymbol("xy"), false);
});
