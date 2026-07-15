import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  bbpHexDigits,
  certifyPiDigits,
  computePiDigits,
  piHexDigits,
  verifyPiDigits,
} from "../src/index.js";

/** The exact 100-decimal prefix quoted in issue #17. */
const ISSUE_17_REFERENCE =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

/** First 32 hex digits of pi after the point (well-known constant). */
const HEX_REFERENCE = "243f6a8885a308d313198a2e03707344";

describe("computePiDigits — exact truncated prefixes", () => {
  it("reproduces the exact 100-digit reference from issue #17", () => {
    assert.equal(computePiDigits(100), ISSUE_17_REFERENCE);
  });

  it("truncates rather than rounds at the boundary", () => {
    // pi = 3.14159265358979323846...170679|82148... so the 100th decimal
    // must stay 9 (truncation); half-up rounding would corrupt it to ...80.
    assert.ok(computePiDigits(100).endsWith("170679"));
    // 50th decimal: pi = ...937510|58209..., digit 51 is 5 — half-up
    // rounding would corrupt the 50th decimal from 0 to 1.
    assert.equal(
      computePiDigits(50),
      "3.14159265358979323846264338327950288419716939937510",
    );
  });

  it("handles small edge cases", () => {
    assert.equal(computePiDigits(0), "3");
    assert.equal(computePiDigits(1), "3.1");
    assert.equal(computePiDigits(2), "3.14");
    assert.equal(computePiDigits(10), "3.1415926535");
  });

  it("every longer prefix extends every shorter prefix (self-consistency)", () => {
    const long = computePiDigits(2_000);
    for (const n of [1, 10, 100, 500, 1_999]) {
      assert.equal(computePiDigits(n), long.slice(0, n + 2));
    }
  });

  it("is deterministic across calls", () => {
    assert.equal(computePiDigits(750), computePiDigits(750));
  });

  it("rejects invalid input", () => {
    assert.throws(() => computePiDigits(-1), RangeError);
    assert.throws(() => computePiDigits(1.5), RangeError);
    assert.throws(() => computePiDigits(Number.NaN), RangeError);
    assert.throws(() => computePiDigits(10_000_001), RangeError);
  });
});

describe("independent cross-verification", () => {
  it("Machin (1706) agrees with Chudnovsky (1988) digit-for-digit at 1,000 digits", () => {
    assert.equal(computePiDigits(1_000, "machin"), computePiDigits(1_000, "chudnovsky"));
  });

  it("decimal-derived hex expansion matches the known hex constant", () => {
    assert.equal(piHexDigits(32), HEX_REFERENCE);
  });

  it("BBP extraction reproduces the known hex constant from position 0", () => {
    assert.equal(bbpHexDigits(0, 6), HEX_REFERENCE.slice(0, 6));
  });

  it("BBP at an offset position matches decimal-derived hex digits", () => {
    const hex = piHexDigits(210);
    for (const pos of [40, 120, 200]) {
      assert.equal(bbpHexDigits(pos, 4), hex.slice(pos, pos + 4), `hex position ${pos}`);
    }
  });

  it("full verification report passes at 1,200 digits", () => {
    const report = verifyPiDigits(1_200);
    assert.equal(report.crossEngineMatch, true);
    for (const check of report.hexSpotChecks) {
      assert.equal(check.match, true, `BBP spot check at ${check.position}`);
    }
    assert.equal(report.allPassed, true);
  });
});

describe("certificates", () => {
  it("issues a reproducible SHA-256 certificate", () => {
    const a = certifyPiDigits(300);
    const b = certifyPiDigits(300);
    assert.equal(a.sha256, b.sha256);
    assert.equal(a.verification.allPassed, true);
    assert.equal(a.prefixHead, computePiDigits(300).slice(0, 22));
  });
});
