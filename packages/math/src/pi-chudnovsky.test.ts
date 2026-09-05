import assert from "node:assert/strict";
import test from "node:test";

import { estimatePiDigits } from "./pi-chudnovsky.ts";

test("estimatePiDigits returns requested precision", () => {
  const value = estimatePiDigits(10);
  assert.match(value, /^3\.14159/);
});

test("estimatePiDigits rejects invalid digit counts", () => {
  assert.throws(() => estimatePiDigits(0));
  assert.throws(() => estimatePiDigits(101));
});
