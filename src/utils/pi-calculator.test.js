// Tests for pi-calculator.js using node:test
// Issue #14 - Bounty from xevrion-v2/agent-playground

const { describe, it } = require('node:test');
const assert = require('node:assert');
const { calculatePI } = require('./pi-calculator');

describe('calculatePI', () => {
  it('should throw for non-integer decimals', () => {
    assert.throws(() => calculatePI(1.5), { message: 'decimals must be a positive integer' });
  });

  it('should throw for zero decimals', () => {
    assert.throws(() => calculatePI(0), { message: 'decimals must be a positive integer' });
  });

  it('should throw for negative decimals', () => {
    assert.throws(() => calculatePI(-3), { message: 'decimals must be a positive integer' });
  });

  it('should throw for NaN', () => {
    assert.throws(() => calculatePI(NaN), { message: 'decimals must be a positive integer' });
  });

  it('should throw for decimals exceeding 100', () => {
    assert.throws(() => calculatePI(101), { message: 'decimals must not exceed 100' });
  });

  it('should throw for non-number input', () => {
    assert.throws(() => calculatePI('5'), { message: 'decimals must be a positive integer' });
  });

  it('should calculate PI to 1 decimal place', () => {
    const result = calculatePI(1);
    assert.strictEqual(result, '3.1');
  });

  it('should calculate PI to 2 decimal places', () => {
    const result = calculatePI(2);
    assert.strictEqual(result, '3.14');
  });

  it('should calculate PI to 5 decimal places', () => {
    const result = calculatePI(5);
    assert.strictEqual(result, '3.14159');
  });

  it('should calculate PI to 10 decimal places', () => {
    const result = calculatePI(10);
    // π = 3.14159265358979...; 11th decimal is 8 ≥ 5 → round half-up to ...6536
    assert.strictEqual(result, '3.1415926536');
  });

  it('should calculate PI to 15 decimal places', () => {
    const result = calculatePI(15);
    assert.strictEqual(result, '3.141592653589793');
  });

  it('should calculate PI to 20 decimal places (common reference)', () => {
    const result = calculatePI(20);
    assert.strictEqual(result, '3.14159265358979323846');
  });

  it('should calculate PI to 50 decimal places', () => {
    const result = calculatePI(50);
    // π = 3.14159265358979323846264338327950288419716939937510582...;
    // 51st decimal is 5 → round half-up to ...39937511
    assert.strictEqual(result, '3.14159265358979323846264338327950288419716939937511');
  });

  it('should calculate PI to 100 decimal places', () => {
    const result = calculatePI(100);
    // π = 3.14159265358979323846264338327950288419716939937510
    //     58209749445923078164062862089986280348253421170679...
    // 101st decimal is 8 ≥ 5 → round half-up last digit 79→80
    const expected = '3.' +
      '14159265358979323846264338327950288419716939937510' +
      '58209749445923078164062862089986280348253421170680';
    assert.strictEqual(result, expected);
  });

  it('should return a string', () => {
    const result = calculatePI(5);
    assert.strictEqual(typeof result, 'string');
  });

  it('should start with "3."', () => {
    const result = calculatePI(20);
    assert.ok(result.startsWith('3.'));
  });
});
