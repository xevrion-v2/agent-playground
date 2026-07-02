import assert from "node:assert/strict";
import test from "node:test";

import { calculatePiPrefix, explainPiPrefixLimit } from "./pi.ts";

const knownPi100 = "3.14159265358979323846264338327950288419716939937510" +
  "58209749445923078164062862089986280348253421170679";

test("calculates exact finite pi prefixes for multiple requested lengths", () => {
  assert.equal(calculatePiPrefix(0), "3");
  assert.equal(calculatePiPrefix(1), "3.1");
  assert.equal(calculatePiPrefix(10), "3.1415926535");
  assert.equal(calculatePiPrefix(50), knownPi100.slice(0, 52));
  assert.equal(calculatePiPrefix(100), knownPi100);
});

test("validates unsupported precision values", () => {
  assert.throws(() => calculatePiPrefix(-1), RangeError);
  assert.throws(() => calculatePiPrefix(1.5), TypeError);
  assert.throws(() => calculatePiPrefix(10_001), RangeError);
});

test("documents why the complete infinite value is not emitted", () => {
  const explanation = explainPiPrefixLimit();

  assert.match(explanation, /infinite non-repeating decimal expansion/);
  assert.match(explanation, /exact finite decimal prefixes/);
});
