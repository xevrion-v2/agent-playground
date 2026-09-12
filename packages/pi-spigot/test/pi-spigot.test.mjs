import assert from "node:assert/strict";
import test from "node:test";
import {
  ISSUE_17_PREFIX_100,
  createPiCertificate,
  formatPiPrefix,
  piDecimalWindow,
  piDigitStream,
  piPrefix
} from "../src/index.mjs";

test("matches the issue's known 100-digit prefix", () => {
  assert.equal(piPrefix(100), ISSUE_17_PREFIX_100);
});

test("streams the integer part and decimal digits in order", () => {
  const stream = piDigitStream();
  const digits = Array.from({ length: 16 }, () => stream.next().value).join("");

  assert.equal(digits, "3141592653589793");
});

test("extracts decimal windows without precomputed constants", () => {
  assert.equal(piDecimalWindow(0, 10), "1415926535");
  assert.equal(piDecimalWindow(10, 10), "8979323846");
  assert.equal(piDecimalWindow(99, 1), "9");
});

test("creates an auditable finite-prefix certificate", () => {
  const certificate = createPiCertificate(100);

  assert.equal(certificate.algorithm, "unbounded-spigot-bigint");
  assert.equal(certificate.decimalPlaces, 100);
  assert.equal(certificate.known100PrefixMatch, true);
  assert.match(certificate.sha256, /^[a-f0-9]{64}$/);
  assert.equal(certificate.lastTwentyDecimals, "86280348253421170679");
});

test("formats prefixes into stable grouped output", () => {
  assert.equal(formatPiPrefix(piPrefix(20), 5, 2), "3.14159 26535\n89793 23846");
});

test("rejects invalid digit requests", () => {
  assert.throws(() => piPrefix(-1), /non-negative integer/);
  assert.throws(() => piPrefix(1.5), /non-negative integer/);
  assert.throws(() => piDecimalWindow(10000, 1), /offset \+ count/);
  assert.throws(() => formatPiPrefix(piPrefix(5), 0), /greater than 0/);
});
