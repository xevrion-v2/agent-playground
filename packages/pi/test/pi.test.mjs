import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  calculatePiPrefix,
  chunkPiPrefix,
  createPiCertificate,
  explainExactPiLimit,
} from "../src/index.js";

const KNOWN_PREFIX_100 =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

describe("@taskflow/pi", () => {
  it("calculates exact finite pi prefixes with integer arithmetic", () => {
    assert.equal(calculatePiPrefix(0), "3");
    assert.equal(calculatePiPrefix(1), "3.1");
    assert.equal(calculatePiPrefix(10), "3.1415926535");
    assert.equal(calculatePiPrefix(100), KNOWN_PREFIX_100);
  });

  it("rejects unsupported digit counts", () => {
    assert.throws(() => calculatePiPrefix(-1), RangeError);
    assert.throws(() => calculatePiPrefix(1.5), RangeError);
    assert.throws(() => calculatePiPrefix(100_001), RangeError);
  });

  it("chunks long prefixes for demo output", () => {
    assert.deepEqual(chunkPiPrefix("3.141592", 3), ["3.1", "415", "92"]);
    assert.throws(() => chunkPiPrefix("3.14", 0), RangeError);
  });

  it("creates an auditable certificate", () => {
    const certificate = createPiCertificate(25);

    assert.equal(certificate.digits, 25);
    assert.equal(certificate.prefix, "3.1415926535897932384626433");
    assert.equal(certificate.knownPrefix100Matches, true);
    assert.match(certificate.sha256, /^[a-f0-9]{64}$/u);
  });

  it("documents the infinite decimal limitation", () => {
    assert.match(explainExactPiLimit(), /infinite, non-repeating decimal expansion/u);
    assert.match(explainExactPiLimit(), /exact finite decimal prefixes/u);
  });
});

