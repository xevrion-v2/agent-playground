import assert from "node:assert/strict";
import test from "node:test";

import { calculatePi } from "./pi";

test("calculatePi converges to JavaScript's PI precision", () => {
  assert.ok(Math.abs(calculatePi(3) - Math.PI) < 1e-14);
});

test("calculatePi rejects invalid iteration counts", () => {
  assert.throws(() => calculatePi(0), /positive integer/);
  assert.throws(() => calculatePi(1.5), /positive integer/);
});
