import test from "node:test";
import assert from "node:assert/strict";

import { parseInteger } from "./parse-integer.js";

test("returns integer numbers unchanged", () => {
  assert.equal(parseInteger(0), 0);
  assert.equal(parseInteger(42), 42);
  assert.equal(parseInteger(-7), -7);
});

test("parses whole-number strings with optional whitespace and signs", () => {
  assert.equal(parseInteger("15"), 15);
  assert.equal(parseInteger("  +15  "), 15);
  assert.equal(parseInteger("-15"), -15);
});

test("rejects partial, decimal, and non-finite numeric values", () => {
  assert.equal(parseInteger("12abc"), null);
  assert.equal(parseInteger("1.2"), null);
  assert.equal(parseInteger(1.2), null);
  assert.equal(parseInteger(Number.POSITIVE_INFINITY), null);
  assert.equal(parseInteger(Number.NaN), null);
});

test("rejects empty, non-number, and unsafe integer values", () => {
  assert.equal(parseInteger(""), null);
  assert.equal(parseInteger("   "), null);
  assert.equal(parseInteger(null), null);
  assert.equal(parseInteger({ value: "1" }), null);
  assert.equal(parseInteger(String(Number.MAX_SAFE_INTEGER + 1)), null);
});
