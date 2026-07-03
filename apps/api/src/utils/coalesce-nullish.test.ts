import { strict as assert } from "node:assert";
import { test } from "node:test";

import { coalesceNullish } from "./coalesce-nullish";

test("uses the fallback for nullish values", () => {
  assert.equal(coalesceNullish(null, "fallback"), "fallback");
  assert.equal(coalesceNullish(undefined, "fallback"), "fallback");
});

test("preserves defined values", () => {
  assert.equal(coalesceNullish(0, 5), 0);
  assert.equal(coalesceNullish("", "fallback"), "");
  assert.equal(coalesceNullish(false, true), false);
  assert.equal(coalesceNullish("value", "fallback"), "value");
});
