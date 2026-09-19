import assert from "node:assert/strict";
import { test } from "node:test";

import { certifyPiPrefix } from "../src/index.mjs";

const PI_100 =
  "3.14159265358979323846264338327950288419716939937510" +
  "58209749445923078164062862089986280348253421170679";

test("certifies the known 100 decimal digit pi prefix", () => {
  const certificate = certifyPiPrefix(100);

  assert.equal(certificate.prefix, PI_100);
  assert.equal(certificate.digits, 100);
  assert.equal(certificate.stable, true);
  assert.equal(certificate.method, "machin-interval");
  assert.ok(certificate.lowerBound <= certificate.upperBound);
  assert.ok(certificate.uncertaintyAtGuardScale > 0n);
});

test("returns deterministic interval metadata for small prefixes", () => {
  const certificate = certifyPiPrefix(12, { guardDigits: 8 });

  assert.equal(certificate.prefix, "3.141592653589");
  assert.equal(certificate.guardDigits, 8);
  assert.deepEqual(certificate.termCounts, { arctanOneFifth: 13, arctanOneOver239: 4 });
});

test("rejects unsafe digit requests", () => {
  assert.throws(() => certifyPiPrefix(-1), /non-negative integer/);
  assert.throws(() => certifyPiPrefix(1001), /at most 1000/);
  assert.throws(() => certifyPiPrefix(4.5), /non-negative integer/);
});
