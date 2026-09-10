import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNullish } from "./is-nullish";

test("detects nullish values", () => {
  assert.equal(isNullish(null), true);
  assert.equal(isNullish(undefined), true);
  assert.equal(isNullish(0), false);
  assert.equal(isNullish(""), false);
  assert.equal(isNullish(false), false);
});

test("narrows unknown to nullish", () => {
  const value: unknown = undefined;

  if (isNullish(value)) {
    const narrowed: null | undefined = value;
    assert.equal(narrowed, undefined);
  } else {
    assert.fail("Expected narrowing");
  }
});
