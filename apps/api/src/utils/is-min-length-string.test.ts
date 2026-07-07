import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isMinLengthString } from "./is-min-length-string";

test("detects strings with a minimum length", () => {
  assert.equal(isMinLengthString("hello", 5), true);
  assert.equal(isMinLengthString("hello", 6), false);
  assert.equal(isMinLengthString("", 0), true);
  assert.equal(isMinLengthString(123, 3), false);
  assert.equal(isMinLengthString(null, 3), false);
});

test("narrows unknown to string", () => {
  const value: unknown = "hello";

  if (isMinLengthString(value, 5)) {
    const narrowed: string = value;
    assert.equal(narrowed, "hello");
  } else {
    assert.fail("Expected narrowing");
  }
});
