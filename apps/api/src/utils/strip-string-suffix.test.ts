import { strict as assert } from "node:assert";
import { test } from "node:test";

import { stripStringSuffix } from "./strip-string-suffix";

test("removes a present suffix", () => {
  assert.equal(stripStringSuffix("hello-done", "-done"), "hello");
  assert.equal(stripStringSuffix("hello", "-done"), "hello");
  assert.equal(stripStringSuffix("", "-done"), "");
  assert.equal(stripStringSuffix("hello", ""), "hello");
});
