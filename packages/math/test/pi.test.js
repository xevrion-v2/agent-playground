import assert from "node:assert/strict";
import { test } from "node:test";

import { estimatePi, formatPiEstimate } from "../src/pi.js";

test("returns the initial Nilakantha value with zero correction terms", () => {
  assert.equal(estimatePi(0), 3);
});

test("improves PI accuracy as more terms are used", () => {
  const coarseError = Math.abs(Math.PI - estimatePi(1));
  const refinedError = Math.abs(Math.PI - estimatePi(1000));

  assert.ok(refinedError < coarseError);
  assert.ok(refinedError < 0.000001);
});

test("formats the estimated PI value with a fixed decimal width", () => {
  assert.equal(formatPiEstimate(1000, 5), "3.14159");
});

test("rejects invalid term counts", () => {
  assert.throws(() => estimatePi(-1), /terms must be a non-negative integer/);
  assert.throws(() => estimatePi(1.5), /terms must be a non-negative integer/);
});
