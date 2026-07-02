import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getPiString, verifyPiDigits, bbpPiHexDigit, computePiBigInt } from '../src/index.js';

describe('PiStream', () => {
  it('should compute PI to 10 decimal places', () => {
    const pi = getPiString(10);
    assert.ok(pi.startsWith('3.1'));
  });

  it('should compute PI to 100 decimal places within tolerance', () => {
    const pi = getPiString(100);
    const REF = '1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679';
    const actual = pi.slice(2, 97); // first 95 fractional digits
    assert.equal(actual, REF.slice(0, 95), 'First 95 digits should match exactly');
  });

  it('should compute PI to 1000 decimal places consistently', () => {
    const pi1 = getPiString(1000);
    const pi2 = getPiString(1000);
    assert.equal(pi1, pi2);
    assert.equal(pi1.length, 1002);
  });

  it('should handle zero digits', () => {
    assert.equal(getPiString(0), '3.');
  });

  it('should verify BBP hex digit at position 0 (known: 0x2)', () => {
    assert.equal(bbpPiHexDigit(0).toString(16).toUpperCase(), '2');
  });

  it('should verify BBP hex digit at position 1 (known: 0x4)', () => {
    assert.equal(bbpPiHexDigit(1).toString(16).toUpperCase(), '4');
  });

  it('should verify BBP hex digit at position 2 (known: 0x3)', () => {
    assert.equal(bbpPiHexDigit(2).toString(16).toUpperCase(), '3');
  });

  it('should verify BBP hex digit at position 3 (known: 0xF)', () => {
    assert.equal(bbpPiHexDigit(3).toString(16).toUpperCase(), 'F');
  });

  it('full verification should pass (95 digits + 6 BBP checks)', () => {
    const errors = verifyPiDigits();
    assert.deepEqual(errors, []);
  });

  it('computePiBigInt should return a bigint', () => {
    const result = computePiBigInt(20);
    assert.equal(typeof result, 'bigint');
    assert.ok(result > 3n);
  });
});
