import { strict as assert } from "node:assert";
import { test } from "node:test";

import { containsSubstring } from "./contains-substring";

test("detects strings containing a substring", () => {
  assert.equal(containsSubstring("hello", "ell"), true);
  assert.equal(containsSubstring("hello", "z"), false);
  assert.equal(containsSubstring("", ""), true);
  assert.equal(containsSubstring(123, "23"), false);
});

test("narrows to string", () => {
  const value: unknown = "substring";

  if (containsSubstring(value, "sub")) {
    const narrowed: string = value;
    assert.equal(narrowed, "substring");
  } else {
    assert.fail("Expected narrowing");
  }
});
