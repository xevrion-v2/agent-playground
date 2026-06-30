import assert from "node:assert/strict";
import test from "node:test";

import { parseDate } from "./parse-date.js";

test("parses valid date strings and timestamps", () => {
  assert.equal(parseDate("2026-07-01T00:00:00.000Z")?.toISOString(), "2026-07-01T00:00:00.000Z");
  assert.equal(parseDate(Date.UTC(2026, 6, 1))?.toISOString(), "2026-07-01T00:00:00.000Z");
});

test("clones Date inputs instead of returning the original object", () => {
  const original = new Date("2026-07-01T00:00:00.000Z");
  const parsed = parseDate(original);

  assert.notEqual(parsed, original);
  assert.equal(parsed?.toISOString(), "2026-07-01T00:00:00.000Z");
});

test("returns undefined for invalid or unsupported values", () => {
  assert.equal(parseDate("not a date"), undefined);
  assert.equal(parseDate(new Date(Number.NaN)), undefined);
  assert.equal(parseDate(Number.NaN), undefined);
  assert.equal(parseDate(Number.POSITIVE_INFINITY), undefined);
  assert.equal(parseDate(null), undefined);
  assert.equal(parseDate({ value: "2026-07-01" }), undefined);
});
