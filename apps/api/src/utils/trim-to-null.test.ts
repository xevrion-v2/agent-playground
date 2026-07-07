import { strict as assert } from "node:assert";
import { test } from "node:test";

import { trimToNull } from "./trim-to-null";

test("trims strings and returns null for blank values", () => {
  assert.equal(trimToNull("hello"), "hello");
  assert.equal(trimToNull("  hello  "), "hello");
  assert.equal(trimToNull(""), null);
  assert.equal(trimToNull("   "), null);
  assert.equal(trimToNull(123), null);
  assert.equal(trimToNull(null), null);
});
