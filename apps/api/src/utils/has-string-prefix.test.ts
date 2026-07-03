import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasStringPrefix } from "./has-string-prefix";

test("detects strings with a required prefix", () => {
  assert.equal(hasStringPrefix("pre-hello", "pre-"), true);
  assert.equal(hasStringPrefix("hello", "pre-"), false);
  assert.equal(hasStringPrefix("hello", ""), true);
  assert.equal(hasStringPrefix("", "pre-"), false);
  assert.equal(hasStringPrefix(123, "1"), false);
  assert.equal(hasStringPrefix(null, ""), false);
});

test("narrows unknown to string", () => {
  const value: unknown = "pre-hello";

  if (hasStringPrefix(value, "pre-")) {
    const narrowed: string = value;
    assert.equal(narrowed, "pre-hello");
  } else {
    assert.fail("Expected narrowing");
  }
});
