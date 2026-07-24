import test from "node:test";
import assert from "node:assert/strict";

import {
  calculatePiPrefix,
  chunkPiPrefix,
  createPiCertificate
} from "../src/index.mjs";

const KNOWN_100_DIGITS =
  "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";

test("calculates exact finite pi prefixes", () => {
  assert.equal(calculatePiPrefix(0), "3");
  assert.equal(calculatePiPrefix(1), "3.1");
  assert.equal(calculatePiPrefix(10), "3.1415926535");
  assert.equal(calculatePiPrefix(100), KNOWN_100_DIGITS);
});

test("rejects unsupported digit counts", () => {
  assert.throws(() => calculatePiPrefix(-1), RangeError);
  assert.throws(() => calculatePiPrefix(1.5), RangeError);
  assert.throws(() => calculatePiPrefix(100_001), RangeError);
});

test("chunks only the decimal portion", () => {
  assert.deepEqual(chunkPiPrefix("3.141592", 3), {
    whole: "3",
    chunks: ["141", "592"]
  });
});

test("creates a stable verification certificate", () => {
  const certificate = createPiCertificate(10);

  assert.equal(certificate.digits, 10);
  assert.equal(certificate.decimalDigits, 10);
  assert.equal(certificate.prefix, "3.1415926535");
  assert.match(certificate.sha256, /^[a-f0-9]{64}$/);
});
