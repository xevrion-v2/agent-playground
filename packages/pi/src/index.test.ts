import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  KNOWN_PI_100_DIGITS,
  calculatePiPrefix,
  explainPiExactnessLimit,
  piPrefixChunks
} from "./index.js";

describe("calculatePiPrefix", () => {
  it("returns exact finite prefixes using integer arithmetic", () => {
    assert.equal(calculatePiPrefix(0), "3");
    assert.equal(calculatePiPrefix(5), "3.14159");
    assert.equal(calculatePiPrefix(100), KNOWN_PI_100_DIGITS);
  });

  it("rejects invalid precision values", () => {
    assert.throws(() => calculatePiPrefix(-1), /non-negative integer/);
    assert.throws(() => calculatePiPrefix(1.5), /non-negative integer/);
    assert.throws(() => calculatePiPrefix(100_001), /100000 or less/);
  });
});

describe("piPrefixChunks", () => {
  it("streams the finite prefix in stable chunks", () => {
    assert.deepEqual([...piPrefixChunks(12, 5)], ["3.", "14159", "26535", "89"]);
  });

  it("rejects invalid chunk sizes", () => {
    assert.throws(() => [...piPrefixChunks(10, 0)], /greater than 0/);
  });
});

describe("explainPiExactnessLimit", () => {
  it("documents why a final decimal digit cannot be produced", () => {
    assert.match(explainPiExactnessLimit(), /never terminates/);
  });
});
