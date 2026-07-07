import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNull } from "./is-null";

test("detects null", () => {
  assert.equal(isNull(null), true);
  assert.equal(isNull(undefined), false);
  assert.equal(isNull(0), false);
  assert.equal(isNull(""), false);
});

test("narrows unknown to null", () => {
  const value: unknown = null;

  if (isNull(value)) {
    const narrowed: null = value;
    assert.equal(narrowed, null);
  } else {
    assert.fail("Expected narrowing");
  }
});
