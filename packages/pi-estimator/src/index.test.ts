import assert from "node:assert/strict";
import test from "node:test";

import { estimatePi, formatPi } from "./index.ts";

function absoluteError(value: number) {
  return Math.abs(Math.PI - value);
}

test("estimates PI with Nilakantha metadata", () => {
  assert.deepEqual(estimatePi(0), {
    algorithm: "nilakantha",
    terms: 0,
    value: 3
  });
});

test("improves accuracy as more terms are evaluated", () => {
  const rough = estimatePi(1).value;
  const better = estimatePi(100).value;
  const best = estimatePi(1000).value;

  assert.ok(absoluteError(better) < absoluteError(rough));
  assert.ok(absoluteError(best) < absoluteError(better));
});

test("formats PI estimates to a requested precision", () => {
  assert.equal(formatPi(estimatePi(1000), 4), "3.1416");
  assert.equal(formatPi(estimatePi(1000), 0), "3");
});

test("rejects invalid term counts", () => {
  assert.throws(() => estimatePi(-1), /non-negative integer/);
  assert.throws(() => estimatePi(1.5), /non-negative integer/);
});

test("rejects unsafe formatting precision", () => {
  assert.throws(() => formatPi(estimatePi(10), -1), /between 0 and 20/);
  assert.throws(() => formatPi(estimatePi(10), 21), /between 0 and 20/);
});
