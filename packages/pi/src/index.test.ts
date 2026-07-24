import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  KNOWN_PI_100_DIGITS,
  calculatePiPrefix,
  createPiPrefixCertificate,
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

describe("createPiPrefixCertificate", () => {
  it("returns auditable metadata for a finite prefix", () => {
    assert.deepEqual(createPiPrefixCertificate(12, 5), {
      chunkCount: 4,
      chunkSize: 5,
      digits: 12,
      firstDigits: "3.141592653589",
      lastDigits: "3.141592653589",
      prefixLength: 14,
      sha256: "1f0960c3ef5338a9e9f3784e332a1cca423a5fb1bbff501e8a2bad94f28b1d20"
    });
  });

  it("rejects invalid certificate chunk sizes", () => {
    assert.throws(() => createPiPrefixCertificate(10, 0), /greater than 0/);
  });
});

describe("explainPiExactnessLimit", () => {
  it("documents why a final decimal digit cannot be produced", () => {
    assert.match(explainPiExactnessLimit(), /never terminates/);
  });
});
