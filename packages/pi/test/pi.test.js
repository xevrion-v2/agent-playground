import test from "node:test";
import assert from "node:assert";
import { calculatePi } from "../src/pi.js";

test("calculatePi - 0 digits", () => {
  assert.strictEqual(calculatePi(0), "3");
});

test("calculatePi - 1 digit", () => {
  assert.strictEqual(calculatePi(1), "3.1");
});

test("calculatePi - 10 digits", () => {
  assert.strictEqual(calculatePi(10), "3.1415926535");
});

test("calculatePi - 50 digits", () => {
  const expected = "3.14159265358979323846264338327950288419716939937510";
  assert.strictEqual(calculatePi(50), expected);
});

test("calculatePi - 100 digits (from Issue #17)", () => {
  const expected = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
  assert.strictEqual(calculatePi(100), expected);
  assert.strictEqual(calculatePi(100).length, 102); // "3." + 100 digits
});

test("calculatePi - invalid input types", () => {
  assert.throws(() => calculatePi("10"), TypeError);
  assert.throws(() => calculatePi(null), TypeError);
  assert.throws(() => calculatePi(undefined), TypeError);
});

test("calculatePi - negative digits", () => {
  assert.throws(() => calculatePi(-1), RangeError);
  assert.throws(() => calculatePi(-100), RangeError);
});
