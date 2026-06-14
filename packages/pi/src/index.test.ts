import assert from "node:assert/strict";
import { test } from "node:test";

import { calculatePiPrefix, formatGroupedPiPrefix } from "./index";

const PI_100 =
  "3.14159265358979323846264338327950288419716939937510" +
  "58209749445923078164062862089986280348253421170679";

test("calculates exact finite pi prefixes with BigInt arithmetic", () => {
  assert.equal(calculatePiPrefix(0), "3");
  assert.equal(calculatePiPrefix(1), "3.1");
  assert.equal(calculatePiPrefix(10), "3.1415926535");
  assert.equal(calculatePiPrefix(100), PI_100);
});

test("is deterministic for repeated calls", () => {
  assert.equal(calculatePiPrefix(75), calculatePiPrefix(75));
});

test("groups long prefixes for CLI output without changing digits", () => {
  const grouped = formatGroupedPiPrefix(calculatePiPrefix(25), 5);

  assert.equal(grouped, "3.14159 26535 89793 23846 26433");
  assert.equal(grouped.replaceAll(" ", ""), calculatePiPrefix(25));
});

test("rejects invalid digit counts", () => {
  assert.throws(() => calculatePiPrefix(-1), /non-negative integer/);
  assert.throws(() => calculatePiPrefix(1.5), /non-negative integer/);
  assert.throws(() => calculatePiPrefix(Number.NaN), /non-negative integer/);
});
