import assert from "node:assert/strict";
import test from "node:test";

import {
  calculatePi,
  calculatePiDigits,
  KNOWN_PI_100
} from "./index.js";

test("calculates the known 100 decimal place PI prefix", () => {
  assert.equal(calculatePi(100), KNOWN_PI_100);
});

test("returns only the integer part when zero decimal places are requested", () => {
  assert.equal(calculatePi(0), "3");
  assert.equal(calculatePiDigits(0), "");
});

test("longer results preserve shorter exact prefixes", () => {
  assert.ok(calculatePi(120).startsWith(KNOWN_PI_100));
});

test("validates requested precision", () => {
  assert.throws(() => calculatePi(-1), RangeError);
  assert.throws(() => calculatePi(1.5), TypeError);
  assert.throws(() => calculatePi(Number.MAX_SAFE_INTEGER + 1), TypeError);
});
