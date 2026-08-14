// Tests for format-currency utility
// Uses Node.js built-in test runner

const assert = require('node:assert');
const { test, describe } = require('node:test');
const { formatCurrency, parseCurrency } = require('./format-currency');

describe('formatCurrency', () => {
  test('formats USD with 2 decimal places', () => {
    assert.strictEqual(formatCurrency(1234.56), '$1,234.56');
  });

  test('formats zero', () => {
    assert.strictEqual(formatCurrency(0), '$0.00');
  });

  test('formats integer amount', () => {
    assert.strictEqual(formatCurrency(100), '$100.00');
  });

  test('formats with CNY symbol', () => {
    assert.strictEqual(formatCurrency(1000, { currency: 'CNY' }), '楼1,000.00');
  });

  test('formats with EUR symbol', () => {
    assert.strictEqual(formatCurrency(99.99, { currency: 'EUR' }), '鈧?9.99');
  });

  test('formats JPY with 0 decimal places', () => {
    assert.strictEqual(formatCurrency(1500, { currency: 'JPY' }), '楼1,500');
  });

  test('formats GBP', () => {
    assert.strictEqual(formatCurrency(50, { currency: 'GBP' }), '拢50.00');
  });

  test('supports custom decimal places', () => {
    assert.strictEqual(formatCurrency(1.5, { decimals: 3 }), '$1.500');
  });

  test('rounds to specified decimals', () => {
    assert.strictEqual(formatCurrency(1.567, { decimals: 1 }), '$1.6');
  });

  test('handles large numbers', () => {
    assert.strictEqual(formatCurrency(1000000), '$1,000,000.00');
  });

  test('handles negative amounts', () => {
    assert.strictEqual(formatCurrency(-50), '-$50.00');
  });

  test('throws for NaN', () => {
    assert.throws(() => formatCurrency(NaN), /finite/);
  });

  test('throws for Infinity', () => {
    assert.throws(() => formatCurrency(Infinity), /finite/);
  });

  test('throws for unsupported currency', () => {
    assert.throws(() => formatCurrency(100, { currency: 'XYZ' }), /unsupported/);
  });

  test('throws for non-number', () => {
    assert.throws(() => formatCurrency('abc'), /finite/);
  });
});

describe('parseCurrency', () => {
  test('parses USD format', () => {
    assert.strictEqual(parseCurrency('$1,234.56'), 1234.56);
  });

  test('parses without commas', () => {
    assert.strictEqual(parseCurrency('$1000.50'), 1000.50);
  });

  test('parses integer values', () => {
    assert.strictEqual(parseCurrency('$100'), 100);
  });

  test('parses CNY format', () => {
    assert.strictEqual(parseCurrency('楼1,000.00'), 1000.00);
  });

  test('returns null for empty string', () => {
    assert.strictEqual(parseCurrency(''), null);
  });

  test('returns null for non-string', () => {
    assert.strictEqual(parseCurrency(123), null);
    assert.strictEqual(parseCurrency(null), null);
    assert.strictEqual(parseCurrency(undefined), null);
  });

  test('returns null for invalid input', () => {
    assert.strictEqual(parseCurrency('abc'), null);
  });
});
