import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { calculatePiPrefix, explainPiLimit } from "../src/index.mjs";

const KNOWN_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

describe("calculatePiPrefix", () => {
  it("returns the integer prefix when zero decimal digits are requested", () => {
    assert.equal(calculatePiPrefix(0), "3");
  });

  it("matches the known 100 decimal digit prefix", () => {
    assert.equal(calculatePiPrefix(100), KNOWN_100);
  });

  it("returns deterministic prefixes for smaller requests", () => {
    assert.equal(calculatePiPrefix(10), "3.1415926535");
    assert.equal(calculatePiPrefix(25), KNOWN_100.slice(0, 27));
  });

  it("validates the requested digit count", () => {
    assert.throws(() => calculatePiPrefix(1.5), TypeError);
    assert.throws(() => calculatePiPrefix(-1), RangeError);
    assert.throws(() => calculatePiPrefix(10001), RangeError);
  });

  it("documents why the infinite decimal cannot be completed", () => {
    assert.match(explainPiLimit(), /finite prefixes/);
    assert.match(explainPiLimit(), /final decimal digit/);
  });
});
