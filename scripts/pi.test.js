import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { computePi } from "./pi.js";

const KNOWN_100 =
  "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

describe("computePi", () => {
  it("returns 120 decimal places matching known prefix", () => {
    const pi = computePi(120);
    assert.match(pi, /^3\./);
    const frac = pi.split(".")[1];
    assert.equal(frac.length, 120);
    assert.equal(frac.slice(0, 100), KNOWN_100);
  });

  it("extends beyond the stale 100-digit snapshot", () => {
    const pi = computePi(120);
    const extra = pi.split(".")[1].slice(100);
    assert.match(extra, /^\d{20}$/);
  });
});
