import assert from "node:assert/strict";
import test from "node:test";

import { calculatePi, calculatePiScaled, integerSqrt } from "./index.js";

const PI_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

test("calculates the known 100-digit PI prefix", () => {
  assert.equal(calculatePi(100), PI_100);
});

test("formats requested decimal precision", () => {
  assert.equal(calculatePi(0), "3");
  assert.equal(calculatePi(1), "3.1");
  assert.equal(calculatePi(5), "3.14159");
  assert.equal(calculatePi(25), "3.1415926535897932384626433");
});

test("returns scaled integer prefixes", () => {
  assert.equal(calculatePiScaled(0), 3n);
  assert.equal(calculatePiScaled(4), 31415n);
});

test("validates decimal place input", () => {
  assert.throws(() => calculatePi(-1), /non-negative safe integer/);
  assert.throws(() => calculatePi(1.5), /non-negative safe integer/);
  assert.throws(() => calculatePi(Number.MAX_SAFE_INTEGER + 1), /non-negative safe integer/);
});

test("integer square root floors exact and non-exact roots", () => {
  assert.equal(integerSqrt(0n), 0n);
  assert.equal(integerSqrt(1n), 1n);
  assert.equal(integerSqrt(15n), 3n);
  assert.equal(integerSqrt(16n), 4n);
  assert.throws(() => integerSqrt(-1n), /negative/);
});

