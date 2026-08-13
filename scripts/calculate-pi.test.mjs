import assert from "node:assert/strict";
import test from "node:test";

import { calculatePiDigits } from "./calculate-pi.mjs";

test("calculatePiDigits returns a known PI prefix", () => {
  assert.equal(
    calculatePiDigits(50),
    "3.14159265358979323846264338327950288419716939937510"
  );
});

test("calculatePiDigits rejects non-positive precision", () => {
  assert.throws(() => calculatePiDigits(0), RangeError);
});
