import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isMaxLengthString } from "./is-max-length-string";

test("detects strings within a maximum length", () => {
  assert.equal(isMaxLengthString("hello", 5), true);
  assert.equal(isMaxLengthString("hello", 4), false);
  assert.equal(isMaxLengthString("", 0), true);
  assert.equal(isMaxLengthString("hello", -1), false);
  assert.equal(isMaxLengthString(123, 3), false);
  assert.equal(isMaxLengthString(null, 3), false);
});

test("narrows unknown to string", () => {
  const value: unknown = "hello";

  if (isMaxLengthString(value, 5)) {
    const narrowed: string = value;
    assert.equal(narrowed, "hello");
  } else {
    assert.fail("Expected narrowing");
  }
});
