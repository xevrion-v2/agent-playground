import test from "node:test";
import assert from "node:assert/strict";

import {
  calculatePiPrefix,
  certifyPiPrefix,
  chunkPiPrefix,
  knownPi100
} from "./index.mjs";

test("calculates the known 100 decimal-place PI prefix", () => {
  assert.equal(calculatePiPrefix(100), knownPi100);
});

test("handles zero and short finite prefixes", () => {
  assert.equal(calculatePiPrefix(0), "3");
  assert.equal(calculatePiPrefix(1), "3.1");
  assert.equal(calculatePiPrefix(10), "3.1415926535");
});

test("chunks the prefix without the decimal point", () => {
  assert.deepEqual(chunkPiPrefix(10, 4), ["3141", "5926", "535"]);
});

test("returns a reproducible verification certificate", () => {
  const certificate = certifyPiPrefix(100, 25);

  assert.equal(certificate.decimalPlaces, 100);
  assert.equal(certificate.digitCount, 101);
  assert.equal(certificate.matchesKnownPrefix, true);
  assert.equal(certificate.exactInfiniteValueAvailable, false);
  assert.equal(certificate.chunks.length, 5);
  assert.equal(
    certificate.sha256,
    "aa6eee625a838a2af84f7d591e8c677bdd9c1b07c44380e2fee8fc738f9234f0"
  );
});

test("rejects invalid inputs", () => {
  assert.throws(() => calculatePiPrefix(-1), /decimalPlaces/);
  assert.throws(() => calculatePiPrefix(1.5), /decimalPlaces/);
  assert.throws(() => chunkPiPrefix(10, 0), /chunkSize/);
});
