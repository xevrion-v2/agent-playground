import assert from "node:assert/strict";
import test from "node:test";

import { estimatePiNilakantha } from "./pi.ts";

test("estimatePiNilakantha improves as terms increase", () => {
  const lowPrecision = Math.abs(Math.PI - estimatePiNilakantha(10));
  const highPrecision = Math.abs(Math.PI - estimatePiNilakantha(1000));

  assert.ok(highPrecision < lowPrecision);
  assert.ok(highPrecision < 0.000001);
});

test("estimatePiNilakantha rejects invalid term counts", () => {
  assert.throws(() => estimatePiNilakantha(0), /positive integer/);
  assert.throws(() => estimatePiNilakantha(1.5), /positive integer/);
});
