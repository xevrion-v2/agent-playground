import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isExactLengthString } from "./is-exact-length-string";

test("detects strings with an exact length", () => {
  assert.equal(isExactLengthString("hello", 5), true);
  assert.equal(isExactLengthString("hello", 4), false);
  assert.equal(isExactLengthString("", 0), true);
  assert.equal(isExactLengthString("hello", -1), false);
  assert.equal(isExactLengthString(123, 3), false);
  assert.equal(isExactLengthString(null, 3), false);
});

test("narrows unknown to string", () => {
  const value: unknown = "hello";

  if (isExactLengthString(value, 5)) {
    const narrowed: string = value;
    assert.equal(narrowed, "hello");
  } else {
    assert.fail("Expected narrowing");
  }
});
