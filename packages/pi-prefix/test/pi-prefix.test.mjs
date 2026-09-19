import test from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import {
  KNOWN_PREFIX,
  calculatePiDigits,
  certifyPiPrefix,
  chunkPiPrefix,
  verifyKnownPrefix
} from '../src/index.js';

const execFileAsync = promisify(execFile);

test('calculates the known 100 fractional digits of pi', () => {
  assert.equal(calculatePiDigits(100), KNOWN_PREFIX);
});

test('calculates shorter finite prefixes without rounding past the requested length', () => {
  assert.equal(calculatePiDigits(0), '3');
  assert.equal(calculatePiDigits(1), '3.1');
  assert.equal(calculatePiDigits(5), '3.14159');
  assert.equal(calculatePiDigits(25), '3.1415926535897932384626433');
});

test('builds stable chunk metadata for audit displays', () => {
  assert.deepEqual(chunkPiPrefix('3.141592', 3), [
    { index: 0, start: 0, end: 3, value: '314' },
    { index: 1, start: 3, end: 6, value: '159' },
    { index: 2, start: 6, end: 7, value: '2' }
  ]);
});

test('creates a deterministic certificate for a finite prefix', () => {
  const certificate = certifyPiPrefix('3.14159');

  assert.equal(certificate.value, '3.14159');
  assert.equal(certificate.characters, 7);
  assert.equal(certificate.numericDigits, 6);
  assert.equal(certificate.fractionalDigits, 5);
  assert.equal(certificate.startsWith, '3.14159');
  assert.equal(certificate.endsWith, '3.14159');
  assert.equal(
    certificate.sha256,
    'c0740dd25c9de39b9c8d5ab452e8b69bcc0bf86f2a60ed7e527e79d0a3035852'
  );
});

test('validates inputs', () => {
  assert.throws(() => calculatePiDigits(-1), /non-negative integer/);
  assert.throws(() => calculatePiDigits(1.5), /non-negative integer/);
  assert.throws(() => chunkPiPrefix('3.14', 0), /positive integer/);
  assert.throws(() => certifyPiPrefix('pi'), /finite decimal string/);
});

test('verifies the embedded known prefix', () => {
  assert.equal(verifyKnownPrefix(), true);
});

test('CLI rejects unexpected positional arguments', async () => {
  await assert.rejects(
    execFileAsync(process.execPath, ['src/cli.js', '100', 'extra'], {
      cwd: new URL('..', import.meta.url)
    }),
    /Unknown argument: extra/
  );
});
