import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isNonBlankString } from "./is-non-blank-string";

test("detects non-blank strings", () => {
  assert.equal(isNonBlankString("hello"), true);
  assert.equal(isNonBlankString(" hello "), true);
  assert.equal(isNonBlankString(""), false);
  assert.equal(isNonBlankString("   "), false);
  assert.equal(isNonBlankString("\n\t"), false);
  assert.equal(isNonBlankString(123), false);
  assert.equal(isNonBlankString(null), false);
});

test("narrows unknown to string", () => {
  const value: unknown = "hello";

  if (isNonBlankString(value)) {
    const narrowed: string = value;
    assert.equal(narrowed, "hello");
  } else {
    assert.fail("Expected narrowing");
  }
});
