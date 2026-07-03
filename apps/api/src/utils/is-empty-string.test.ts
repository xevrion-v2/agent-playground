import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isEmptyString } from "./is-empty-string";

test("detects empty strings", () => {
  assert.equal(isEmptyString(""), true);
  assert.equal(isEmptyString("a"), false);
  assert.equal(isEmptyString(" "), false);
  assert.equal(isEmptyString(0), false);
  assert.equal(isEmptyString(null), false);
});

test("narrows unknown to empty string literal", () => {
  const value: unknown = "";

  if (isEmptyString(value)) {
    const narrowed: "" = value;
    assert.equal(narrowed, "");
  } else {
    assert.fail("Expected narrowing");
  }
});
