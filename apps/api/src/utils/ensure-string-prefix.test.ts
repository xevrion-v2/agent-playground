import { strict as assert } from "node:assert";
import { test } from "node:test";

import { ensureStringPrefix } from "./ensure-string-prefix";

test("adds a missing prefix", () => {
  assert.equal(ensureStringPrefix("hello", "pre-"), "pre-hello");
  assert.equal(ensureStringPrefix("pre-hello", "pre-"), "pre-hello");
  assert.equal(ensureStringPrefix("", "pre-"), "pre-");
  assert.equal(ensureStringPrefix("hello", ""), "hello");
});
