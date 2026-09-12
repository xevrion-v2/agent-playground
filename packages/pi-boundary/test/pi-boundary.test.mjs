import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  buildPiCertificate,
  calculatePiPrefix,
  chunkDecimalPrefix,
  explainNoFinalDigit,
  KNOWN_PI_100
} from '../src/index.js';

test('calculates the known 100-digit pi prefix', () => {
  assert.equal(calculatePiPrefix(100), KNOWN_PI_100);
});

test('calculates shorter exact finite prefixes', () => {
  assert.equal(calculatePiPrefix(0), '3');
  assert.equal(calculatePiPrefix(1), '3.1');
  assert.equal(calculatePiPrefix(10), '3.1415926535');
  assert.equal(calculatePiPrefix(25), '3.1415926535897932384626433');
});

test('builds a deterministic verification certificate', () => {
  const certificate = buildPiCertificate(100);
  assert.equal(certificate.digits, 100);
  assert.equal(certificate.prefix, KNOWN_PI_100);
  assert.equal(certificate.knownPrefixMatches, true);
  assert.equal(certificate.sha256.length, 64);
  assert.match(certificate.boundary, /no final decimal digit/i);
});

test('chunks the fractional part without changing digits', () => {
  const chunks = chunkDecimalPrefix(calculatePiPrefix(20), 5);
  assert.equal(chunks.integerPart, '3');
  assert.deepEqual(chunks.chunks, ['14159', '26535', '89793', '23846']);
  assert.equal(chunks.formatted, '3.14159 26535 89793 23846');
});

test('rejects invalid digit and chunk inputs', () => {
  assert.throws(() => calculatePiPrefix(-1), /digits must be an integer/);
  assert.throws(() => calculatePiPrefix(20001), /digits must be an integer/);
  assert.throws(() => calculatePiPrefix(1.5), /digits must be an integer/);
  assert.throws(() => chunkDecimalPrefix('3.14', 0), /chunkSize must be an integer/);
});

test('documents that the infinite final digit does not exist', () => {
  assert.match(explainNoFinalDigit(), /irrational/i);
  assert.match(explainNoFinalDigit(), /finite version/i);
});
