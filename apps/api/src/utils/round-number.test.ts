import assert from "node:assert/strict";
import test from "node:test";

import { roundNumber } from "./round-number.js";

test("roundNumber rounds to the nearest integer by default", () => {
  assert.equal(roundNumber(12.5), 13);
  assert.equal(roundNumber(-12.5), -12);
});

test("roundNumber supports positive decimal precision", () => {
  assert.equal(roundNumber(1.2345, 2), 1.23);
  assert.equal(roundNumber(1.2355, 2), 1.24);
});

test("roundNumber supports negative precision for coarse rounding", () => {
  assert.equal(roundNumber(1234, -2), 1200);
  assert.equal(roundNumber(1275, -2), 1300);
});

test("roundNumber truncates fractional precision values", () => {
  assert.equal(roundNumber(1.2345, 2.9), 1.23);
});

test("roundNumber leaves non-finite values unchanged", () => {
  assert.equal(roundNumber(Number.POSITIVE_INFINITY), Number.POSITIVE_INFINITY);
  assert.ok(Number.isNaN(roundNumber(Number.NaN)));
  assert.equal(roundNumber(12.34, Number.POSITIVE_INFINITY), 12.34);
});
