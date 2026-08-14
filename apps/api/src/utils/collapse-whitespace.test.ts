import { strict as assert } from "node:assert";
import { test } from "node:test";

import { collapseWhitespace } from "./collapse-whitespace";

test("trims and collapses whitespace", () => {
  assert.equal(collapseWhitespace("hello"), "hello");
  assert.equal(collapseWhitespace("  hello   world  "), "hello world");
  assert.equal(collapseWhitespace("line\nbreak\tand  spaces"), "line break and spaces");
  assert.equal(collapseWhitespace("   "), "");
});
