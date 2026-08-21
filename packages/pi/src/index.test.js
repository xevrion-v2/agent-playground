import test from "node:test";
import assert from "node:assert/strict";

import {
  calculatePiChunks,
  calculatePiPrefix,
  explainFinitePiComputation
} from "./index.js";

const PI_100 =
  "3.14159265358979323846264338327950288419716939937510" +
  "58209749445923078164062862089986280348253421170679";

test("calculatePiPrefix returns the known 100 decimal place prefix", () => {
  assert.equal(calculatePiPrefix(100), PI_100);
});

test("calculatePiPrefix supports zero decimal places", () => {
  assert.equal(calculatePiPrefix(0), "3");
});

test("calculatePiChunks splits only the decimal digits", () => {
  const result = calculatePiChunks(12, 4);

  assert.equal(result.value, "3.141592653589");
  assert.deepEqual(result.chunks, ["1415", "9265", "3589"]);
});

test("calculatePiPrefix rejects invalid decimal counts", () => {
  assert.throws(() => calculatePiPrefix(-1), RangeError);
  assert.throws(() => calculatePiPrefix(1.5), TypeError);
  assert.throws(() => calculatePiPrefix(10_001), RangeError);
});

test("calculatePiChunks rejects invalid chunk sizes", () => {
  assert.throws(() => calculatePiChunks(10, 0), RangeError);
  assert.throws(() => calculatePiChunks(10, 2.5), RangeError);
});

test("explainFinitePiComputation documents the finite-prefix limit", () => {
  const explanation = explainFinitePiComputation();

  assert.match(explanation, /infinite/);
  assert.match(explanation, /finite prefixes/);
  assert.match(explanation, /integer arithmetic/);
});
