import { strict as assert } from "node:assert";
import { test } from "node:test";

import { stringEqualsIgnoreCase } from "./string-equals-ignore-case";

test("detects case-insensitive string equality", () => {
  assert.equal(stringEqualsIgnoreCase("Hello", "hello"), true);
  assert.equal(stringEqualsIgnoreCase("Hello", "world"), false);
  assert.equal(stringEqualsIgnoreCase("", ""), true);
  assert.equal(stringEqualsIgnoreCase(123, "123"), false);
});

test("narrows to string", () => {
  const value: unknown = "hello";

  if (stringEqualsIgnoreCase(value, "HELLO")) {
    const narrowed: string = value;
    assert.equal(narrowed, "hello");
  } else {
    assert.fail("Expected narrowing");
  }
});
