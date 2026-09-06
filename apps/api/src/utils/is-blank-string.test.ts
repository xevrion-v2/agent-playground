import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isBlankString } from "./is-blank-string";

test("detects blank strings", () => {
  assert.equal(isBlankString(""), true);
  assert.equal(isBlankString("   "), true);
  assert.equal(isBlankString("\n\t"), true);
  assert.equal(isBlankString("hello"), false);
  assert.equal(isBlankString(0), false);
});

test("narrows to string", () => {
  const value: unknown = " ";

  if (isBlankString(value)) {
    const narrowed: string = value;
    assert.equal(narrowed, " ");
  } else {
    assert.fail("Expected narrowing");
  }
});
