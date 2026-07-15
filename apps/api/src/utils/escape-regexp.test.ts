import { strict as assert } from "node:assert";
import { test } from "node:test";

import { escapeRegExp } from "./escape-regexp";

test("escapes regular expression metacharacters", () => {
  assert.equal(escapeRegExp("a.b"), "a\\.b");
  assert.equal(escapeRegExp("foo+bar?"), "foo\\+bar\\?");
  assert.equal(escapeRegExp("[test](x)"), "\\[test\\]\\(x\\)");
  assert.equal(escapeRegExp("path\\name"), "path\\\\name");
});

test("leaves plain text unchanged", () => {
  assert.equal(escapeRegExp("hello world"), "hello world");
});
