import assert from "node:assert/strict";
import test from "node:test";

import { isBetweenNumber } from "./is-between-number.ts";

test("accepts finite numbers inside an inclusive range", () => {
  assert.equal(isBetweenNumber(5, 1, 10), true);
  assert.equal(isBetweenNumber(1, 1, 10), true);
  assert.equal(isBetweenNumber(10, 1, 10), true);
  assert.equal(isBetweenNumber(-2.5, -3, -2), true);
});

test("rejects values outside the inclusive range", () => {
  assert.equal(isBetweenNumber(0, 1, 10), false);
  assert.equal(isBetweenNumber(11, 1, 10), false);
});

test("rejects non-number and non-finite inputs", () => {
  assert.equal(isBetweenNumber("5", 1, 10), false);
  assert.equal(isBetweenNumber(null, 1, 10), false);
  assert.equal(isBetweenNumber(Number.NaN, 1, 10), false);
  assert.equal(isBetweenNumber(Number.POSITIVE_INFINITY, 1, 10), false);
});

test("rejects invalid range bounds", () => {
  assert.equal(isBetweenNumber(5, 10, 1), false);
  assert.equal(isBetweenNumber(5, Number.NaN, 10), false);
  assert.equal(isBetweenNumber(5, 1, Number.POSITIVE_INFINITY), false);
});
