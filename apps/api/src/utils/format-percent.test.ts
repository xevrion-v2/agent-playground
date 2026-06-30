import assert from "node:assert/strict";
import test from "node:test";

import { formatPercent } from "./format-percent.js";

test("formats finite ratios as percentage strings", () => {
  assert.equal(formatPercent(0), "0.00%");
  assert.equal(formatPercent(0.1234), "12.34%");
  assert.equal(formatPercent(1), "100.00%");
  assert.equal(formatPercent(-0.5), "-50.00%");
});

test("supports explicit fraction digit counts", () => {
  assert.equal(formatPercent(0.1234, 0), "12%");
  assert.equal(formatPercent(0.1234, 1), "12.3%");
  assert.equal(formatPercent(0.129, 2), "12.90%");
});

test("rejects non-finite values", () => {
  assert.throws(() => formatPercent(Number.NaN), /finite number/);
  assert.throws(() => formatPercent(Number.POSITIVE_INFINITY), /finite number/);
  assert.throws(() => formatPercent(Number.NEGATIVE_INFINITY), /finite number/);
});

test("rejects invalid fraction digit counts", () => {
  assert.throws(() => formatPercent(0.5, -1), /integer between 0 and 20/);
  assert.throws(() => formatPercent(0.5, 21), /integer between 0 and 20/);
  assert.throws(() => formatPercent(0.5, 1.5), /integer between 0 and 20/);
});
