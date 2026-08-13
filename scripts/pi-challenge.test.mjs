import test from "node:test";
import assert from "node:assert/strict";

import { arctanSeries, calculatePi, describePiApproach } from "./pi-challenge.mjs";

test("arctanSeries returns a stable approximation", () => {
  assert.ok(Math.abs(arctanSeries(1 / 5, 12) - Math.atan(1 / 5)) < 1e-12);
});

test("calculatePi stays very close to Math.PI", () => {
  assert.ok(Math.abs(calculatePi(12) - Math.PI) < 1e-12);
});

test("describePiApproach documents the chosen algorithm", () => {
  assert.deepEqual(describePiApproach(12), {
    algorithm: "Machin-like formula",
    terms: 12,
    pi: calculatePi(12),
    notes: "Uses 16 * arctan(1/5) - 4 * arctan(1/239) with a deterministic truncated series."
  });
});
