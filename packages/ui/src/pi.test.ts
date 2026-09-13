import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { approximatePi } from "./index";

describe("approximatePi", () => {
  it("returns the first Leibniz term when one iteration is requested", () => {
    assert.equal(approximatePi(1), 4);
  });

  it("converges toward Math.PI with enough iterations", () => {
    assert.ok(Math.abs(approximatePi(100_000) - Math.PI) < 0.00002);
  });

  it("rejects invalid iteration counts", () => {
    for (const iterations of [0, -1, 1.5, Number.NaN]) {
      assert.throws(() => approximatePi(iterations), RangeError);
    }
  });
});
