import assert from "node:assert/strict";
import test from "node:test";

import { isValidDate } from "./is-valid-date.ts";

test("returns true for a valid Date instance", () => {
  assert.equal(isValidDate(new Date("2026-01-01T00:00:00.000Z")), true);
});

test("rejects invalid Date instances", () => {
  assert.equal(isValidDate(new Date("not a date")), false);
});

test("rejects date-like non-Date values", () => {
  assert.equal(isValidDate("2026-01-01"), false);
  assert.equal(isValidDate(1_767_225_600_000), false);
  assert.equal(isValidDate(null), false);
});
