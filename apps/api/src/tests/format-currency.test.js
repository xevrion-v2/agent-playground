import assert from "node:assert/strict";
import { test } from "node:test";

import { formatCurrency, parseCurrency } from "../utils/format-currency.js";

test("formats USD", () => {
  assert.equal(formatCurrency(1234.56, "USD"), "$1,234.56");
});

test("formats EUR", () => {
  assert.equal(formatCurrency(1234.56, "EUR"), "€1,234.56");
});

test("formats GBP", () => {
  assert.equal(formatCurrency(1234.56, "GBP"), "£1,234.56");
});

test("formats CNY", () => {
  assert.equal(formatCurrency(1234.56, "CNY"), "CN¥1,234.56");
});

test("formats JPY", () => {
  assert.equal(formatCurrency(1234, "JPY"), "¥1,234");
});

test("formats CAD", () => {
  assert.equal(formatCurrency(1234.56, "CAD"), "CA$1,234.56");
});

test("formats AUD", () => {
  assert.equal(formatCurrency(1234.56, "AUD"), "A$1,234.56");
});

test("formats negative amounts", () => {
  assert.equal(formatCurrency(-12.5, "USD"), "-$12.50");
});

test("formats zero amounts", () => {
  assert.equal(formatCurrency(0, "USD"), "$0.00");
});

test("formats large amounts", () => {
  assert.equal(formatCurrency(1234567890.12, "USD"), "$1,234,567,890.12");
});

test("formats with custom decimal places", () => {
  assert.equal(formatCurrency(1.2345, "USD", 3), "$1.235");
});

test("parses USD", () => {
  assert.equal(parseCurrency("$1,234.56", "USD"), 1234.56);
});

test("parses EUR", () => {
  assert.equal(parseCurrency("€1,234.56", "EUR"), 1234.56);
});

test("parses GBP", () => {
  assert.equal(parseCurrency("£1,234.56", "GBP"), 1234.56);
});

test("parses CNY", () => {
  assert.equal(parseCurrency("CN¥1,234.56", "CNY"), 1234.56);
});

test("parses JPY", () => {
  assert.equal(parseCurrency("¥1,234", "JPY"), 1234);
});

test("parses CAD", () => {
  assert.equal(parseCurrency("CA$1,234.56", "CAD"), 1234.56);
});

test("parses AUD", () => {
  assert.equal(parseCurrency("A$1,234.56", "AUD"), 1234.56);
});

test("parses negative amounts", () => {
  assert.equal(parseCurrency("-$12.50", "USD"), -12.5);
});

test("parses custom decimal places", () => {
  assert.equal(parseCurrency("$1.235", "USD", 3), 1.235);
});

test("returns NaN for invalid input", () => {
  assert.ok(Number.isNaN(parseCurrency("not a currency", "USD")));
});

test("returns NaN for null input", () => {
  assert.ok(Number.isNaN(parseCurrency(null, "USD")));
});
