import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasStringSuffix } from "./has-string-suffix";

test("detects strings with a required suffix", () => {
  assert.equal(hasStringSuffix("hello-suf", "-suf"), true);
  assert.equal(hasStringSuffix("hello", "-suf"), false);
  assert.equal(hasStringSuffix("hello", ""), true);
  assert.equal(hasStringSuffix("", "-suf"), false);
  assert.equal(hasStringSuffix(123, "3"), false);
  assert.equal(hasStringSuffix(null, ""), false);
});

test("narrows unknown to string", () => {
  const value: unknown = "hello-suf";

  if (hasStringSuffix(value, "-suf")) {
    const narrowed: string = value;
    assert.equal(narrowed, "hello-suf");
  } else {
    assert.fail("Expected narrowing");
  }
});
