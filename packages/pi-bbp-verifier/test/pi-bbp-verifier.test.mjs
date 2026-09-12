import assert from "node:assert/strict";
import { test } from "node:test";

import {
  PI_100_DIGIT_PREFIX,
  computePiDecimalPrefix,
  computePiHexPrefix,
  createPiCertificate
} from "../src/index.mjs";

test("computes exact finite decimal prefixes of pi", () => {
  assert.equal(computePiDecimalPrefix(0), "3");
  assert.equal(computePiDecimalPrefix(5), "3.14159");
  assert.equal(computePiDecimalPrefix(100), PI_100_DIGIT_PREFIX);
});

test("computes BBP hexadecimal digits independently", () => {
  assert.equal(computePiHexPrefix(16), "243F6A8885A308D3");
  assert.equal(computePiHexPrefix(32), "243F6A8885A308D313198A2E03707344");
});

test("creates an auditable certificate without floating point decimal math", () => {
  const certificate = createPiCertificate(25, 16);

  assert.equal(certificate.decimalDigits, 25);
  assert.equal(certificate.hexDigits, 16);
  assert.equal(certificate.decimalPrefix, "3.1415926535897932384626433");
  assert.equal(certificate.bbpHexPrefix, "243F6A8885A308D3");
  assert.match(certificate.sha256, /^[a-f0-9]{64}$/);
  assert.match(certificate.note, /finite prefixes/i);
});

test("rejects invalid requested precision", () => {
  assert.throws(() => computePiDecimalPrefix(-1), /non-negative integer/);
  assert.throws(() => computePiHexPrefix(1.5), /non-negative integer/);
});
