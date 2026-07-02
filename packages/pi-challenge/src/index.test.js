import assert from "node:assert/strict";
import test from "node:test";

import { calculatePi } from "./index.js";

test("calculatePi rejects invalid input", () => {
  assert.throws(() => calculatePi(0), RangeError);
  assert.throws(() => calculatePi(1.2), RangeError);
});

test("calculatePi converges toward PI", () => {
  const approximation = calculatePi(5000);
  assert.ok(Math.abs(approximation - Math.PI) < 0.001);
});
