const test = require("node:test");
const assert = require("node:assert/strict");
const { formatCurrency, parseCurrency } = require("./format-currency");

test("format USD", () => {
  assert.equal(formatCurrency(1234.5, "USD"), "$1,234.50");
});

test("format EUR", () => {
  assert.equal(formatCurrency(99, "EUR"), "€99.00");
});

test("format GBP", () => {
  assert.equal(formatCurrency(10, "GBP"), "£10.00");
});

test("format CNY", () => {
  assert.equal(formatCurrency(100, "CNY"), "¥100.00");
});

test("format JPY no decimals", () => {
  assert.equal(formatCurrency(500, "JPY"), "¥500");
});

test("format CAD", () => {
  assert.equal(formatCurrency(20, "CAD"), "C$20.00");
});

test("format AUD", () => {
  assert.equal(formatCurrency(20, "AUD"), "A$20.00");
});

test("format negative", () => {
  assert.equal(formatCurrency(-12.3, "USD"), "-$12.30");
});

test("format zero", () => {
  assert.equal(formatCurrency(0, "USD"), "$0.00");
});

test("format large number", () => {
  assert.equal(formatCurrency(1000000, "USD"), "$1,000,000.00");
});

test("format custom decimals", () => {
  assert.equal(formatCurrency(1.2345, "USD", { decimals: 3 }), "$1.235");
});

test("format invalid amount", () => {
  assert.equal(formatCurrency(Number.NaN, "USD"), "");
});

test("parse USD", () => {
  assert.equal(parseCurrency("$12.50", "USD"), 12.5);
});

test("parse EUR symbol", () => {
  assert.equal(parseCurrency("€8.00", "EUR"), 8);
});

test("parse with commas", () => {
  assert.equal(parseCurrency("$1,234.56", "USD"), 1234.56);
});

test("parse negative", () => {
  assert.equal(parseCurrency("-$4.00", "USD"), -4);
});

test("parse empty", () => {
  assert.ok(Number.isNaN(parseCurrency("", "USD")));
});

test("parse null", () => {
  assert.ok(Number.isNaN(parseCurrency(null, "USD")));
});

test("parse invalid", () => {
  assert.ok(Number.isNaN(parseCurrency("abc", "USD")));
});

test("round trip USD", () => {
  assert.equal(parseCurrency(formatCurrency(42.5, "USD"), "USD"), 42.5);
});

test("format lowercase currency code", () => {
  assert.equal(formatCurrency(5, "usd"), "$5.00");
});

test("parse GBP", () => {
  assert.equal(parseCurrency("£15.25", "GBP"), 15.25);
});
