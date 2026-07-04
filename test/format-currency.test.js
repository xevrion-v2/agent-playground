const assert = require("node:assert/strict");
const test = require("node:test");

const { formatCurrency, parseCurrency } = require("../src/utils/format-currency");

test("formats USD with default cents", () => {
  assert.equal(formatCurrency(1234.5, "USD"), "$1,234.50");
});

test("formats EUR", () => {
  assert.equal(formatCurrency(1234.5, "EUR"), "€1,234.50");
});

test("formats GBP", () => {
  assert.equal(formatCurrency(1234.5, "GBP"), "£1,234.50");
});

test("formats CNY", () => {
  assert.equal(formatCurrency(1234.5, "CNY"), "CN¥1,234.50");
});

test("formats JPY without default decimals", () => {
  assert.equal(formatCurrency(1234.5, "JPY"), "¥1,235");
});

test("formats CAD", () => {
  assert.equal(formatCurrency(1234.5, "CAD"), "CA$1,234.50");
});

test("formats AUD", () => {
  assert.equal(formatCurrency(1234.5, "AUD"), "A$1,234.50");
});

test("formats negative amounts", () => {
  assert.equal(formatCurrency(-987.65, "USD"), "-$987.65");
});

test("formats zero without negative zero output", () => {
  assert.equal(formatCurrency(-0, "USD"), "$0.00");
});

test("formats large numbers", () => {
  assert.equal(formatCurrency(1234567890.12, "USD"), "$1,234,567,890.12");
});

test("supports custom decimal places", () => {
  assert.equal(formatCurrency(12.3456, { currency: "USD", decimalPlaces: 3 }), "$12.346");
});

test("supports custom locale", () => {
  assert.equal(formatCurrency(1234.5, { currency: "EUR", locale: "de-DE" }), "1.234,50 €");
});

test("rejects unsupported currencies", () => {
  assert.throws(() => formatCurrency(12, "INR"), RangeError);
});

test("rejects non-finite amounts", () => {
  assert.throws(() => formatCurrency(Number.NaN, "USD"), TypeError);
});

test("parses USD formatted strings", () => {
  assert.equal(parseCurrency("$1,234.50"), 1234.5);
});

test("parses currency codes", () => {
  assert.equal(parseCurrency("EUR 1,234.50"), 1234.5);
});

test("parses negative strings", () => {
  assert.equal(parseCurrency("-£987.65"), -987.65);
});

test("parses parenthesized negatives", () => {
  assert.equal(parseCurrency("($987.65)"), -987.65);
});

test("parses zero", () => {
  assert.equal(parseCurrency("$0.00"), 0);
});

test("parses European separators", () => {
  assert.equal(parseCurrency("1.234,56 €"), 1234.56);
});

test("parses numbers directly", () => {
  assert.equal(parseCurrency(42.25), 42.25);
});

test("rejects invalid currency strings", () => {
  assert.throws(() => parseCurrency("not money"), TypeError);
});
