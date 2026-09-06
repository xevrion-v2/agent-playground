import { strict as assert } from "node:assert";
import { test } from "node:test";

import { ensureStringSuffix } from "./ensure-string-suffix";

test("adds a missing suffix", () => {
  assert.equal(ensureStringSuffix("hello", "-done"), "hello-done");
  assert.equal(ensureStringSuffix("hello-done", "-done"), "hello-done");
  assert.equal(ensureStringSuffix("", "-done"), "-done");
  assert.equal(ensureStringSuffix("hello", ""), "hello");
});
