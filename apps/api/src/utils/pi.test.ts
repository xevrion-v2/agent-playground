import assert from "node:assert/strict";
import test from "node:test";

import { estimatePi } from "./pi.js";

test("estimatePi returns a documented Nilakantha estimate", () => {
  const result = estimatePi(10);

  assert.equal(result.algorithm, "nilakantha");
  assert.equal(result.terms, 10);
  assert.equal(Number.isFinite(result.value), true);
});

test("estimatePi improves accuracy as more terms are evaluated", () => {
  const coarseError = Math.abs(Math.PI - estimatePi(5).value);
  const refinedError = Math.abs(Math.PI - estimatePi(500).value);

  assert.ok(refinedError < coarseError);
  assert.ok(refinedError < 0.000001);
});

test("estimatePi rejects invalid term counts", () => {
  assert.throws(() => estimatePi(0), /positive integer/);
  assert.throws(() => estimatePi(1.5), /positive integer/);
});
