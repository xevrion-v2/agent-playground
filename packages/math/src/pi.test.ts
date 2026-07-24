import assert from "node:assert/strict";
import test from "node:test";

import { estimatePi, estimatePiDefault } from "./pi.ts";

test("estimatePi approaches PI with more iterations", () => {
  const rough = estimatePi(100);
  const better = estimatePi(10_000);
  assert.ok(Math.abs(rough - Math.PI) > Math.abs(better - Math.PI));
});

test("estimatePiDefault returns a finite value", () => {
  const value = estimatePiDefault();
  assert.ok(Number.isFinite(value));
  assert.ok(Math.abs(value - Math.PI) < 0.01);
});

test("estimatePi rejects invalid iteration counts", () => {
  assert.throws(() => estimatePi(0));
});
