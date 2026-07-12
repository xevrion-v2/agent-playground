const assert = require('node:assert/strict');
const test = require('node:test');

const { formatCurrency, parseCurrency } = require('./format-currency');

test('formatCurrency formats USD by default', () => {
  assert.equal(formatCurrency(1234.56), '$1,234.56');
});

test('formatCurrency formats EUR', () => {
  assert.equal(formatCurrency(1234.56, 'EUR'), '\u20ac1,234.56');
});

test('formatCurrency formats GBP', () => {
  assert.equal(formatCurrency(1234.56, 'GBP'), '\u00a31,234.56');
});

test('formatCurrency formats CNY', () => {
  assert.equal(formatCurrency(1234.56, 'CNY'), '\u00a51,234.56');
});

test('formatCurrency formats JPY with zero decimals by default', () => {
  assert.equal(formatCurrency(1234.56, 'JPY'), '\u00a51,235');
});

test('formatCurrency formats CAD', () => {
  assert.equal(formatCurrency(1234.56, 'CAD'), 'C$1,234.56');
});

test('formatCurrency formats AUD', () => {
  assert.equal(formatCurrency(1234.56, 'AUD'), 'A$1,234.56');
});

test('formatCurrency formats zero', () => {
  assert.equal(formatCurrency(0), '$0.00');
});

test('formatCurrency formats negative amounts', () => {
  assert.equal(formatCurrency(-42.5), '-$42.50');
});

test('formatCurrency formats large numbers', () => {
  assert.equal(formatCurrency(1234567890.12), '$1,234,567,890.12');
});

test('formatCurrency supports zero custom decimals', () => {
  assert.equal(formatCurrency(12.34, 'USD', { decimals: 0 }), '$12');
});

test('formatCurrency supports three custom decimals', () => {
  assert.equal(formatCurrency(12.3456, 'USD', { decimals: 3 }), '$12.346');
});

test('formatCurrency accepts numeric strings', () => {
  assert.equal(formatCurrency('19.9', 'GBP'), '\u00a319.90');
});

test('formatCurrency returns empty string for invalid amounts', () => {
  assert.equal(formatCurrency('abc'), '');
});

test('formatCurrency returns empty string for unsupported currencies', () => {
  assert.equal(formatCurrency(10, 'CHF'), '');
});

test('parseCurrency parses USD strings', () => {
  assert.equal(parseCurrency('$1,234.56'), 1234.56);
});

test('parseCurrency parses EUR strings', () => {
  assert.equal(parseCurrency('\u20ac99.50'), 99.5);
});

test('parseCurrency parses negative values with a leading minus', () => {
  assert.equal(parseCurrency('-$42.50'), -42.5);
});

test('parseCurrency parses negative values with parentheses', () => {
  assert.equal(parseCurrency('($42.50)'), -42.5);
});

test('parseCurrency parses large values with commas', () => {
  assert.equal(parseCurrency('A$1,234,567.89'), 1234567.89);
});

test('parseCurrency returns finite numeric input unchanged', () => {
  assert.equal(parseCurrency(12.5), 12.5);
});

test('parseCurrency returns undefined for invalid input', () => {
  assert.equal(parseCurrency('not money'), undefined);
});
