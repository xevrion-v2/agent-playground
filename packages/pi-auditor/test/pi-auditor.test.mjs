import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildPiCertificate,
  calculatePiPrefix,
  chunkPiPrefix,
  explainFinitePiTarget,
  KNOWN_PI_100
} from "../src/index.mjs";

describe("calculatePiPrefix", () => {
  it("returns exact known prefixes for several requested precisions", () => {
    assert.equal(calculatePiPrefix(0), "3");
    assert.equal(calculatePiPrefix(1), "3.1");
    assert.equal(calculatePiPrefix(10), "3.1415926535");
    assert.equal(calculatePiPrefix(100), KNOWN_PI_100);
  });

  it("rejects unsafe or ambiguous precision requests", () => {
    assert.throws(() => calculatePiPrefix(-1), /between 0/);
    assert.throws(() => calculatePiPrefix(1.5), /integer/);
    assert.throws(() => calculatePiPrefix(10, { guardDigits: 2 }), /guardDigits/);
  });
});

describe("certificate helpers", () => {
  it("builds an auditable certificate for a finite prefix", () => {
    const certificate = buildPiCertificate(25, { groupSize: 5 });

    assert.equal(certificate.decimalPlaces, 25);
    assert.equal(certificate.value, "3.1415926535897932384626433");
    assert.equal(certificate.knownPrefixMatched, true);
    assert.match(certificate.sha256, /^[0-9a-f]{64}$/);
    assert.deepEqual(certificate.chunks, ["3.14159", "26535", "89793", "23846", "26433"]);
  });

  it("chunks decimal strings without changing their content", () => {
    const value = "3.1415926535";
    const chunks = chunkPiPrefix(value, 4);

    assert.deepEqual(chunks, ["3.1415", "9265", "35"]);
    assert.equal(chunks.join("").replace(".", ""), value.replace(".", ""));
  });

  it("explains why the target is finite-prefix calculation", () => {
    assert.match(explainFinitePiTarget(), /irrational/);
    assert.match(explainFinitePiTarget(), /finite prefixes/);
  });
});
