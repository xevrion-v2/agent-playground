import { strict as assert } from "node:assert";
import { test } from "node:test";

import { parseJsonString } from "./parse-json-string";

test("parses JSON strings", () => {
  assert.equal(parseJsonString('"hello"'), "hello");
  assert.equal(parseJsonString('""'), "");
});

test("returns null for non-string or invalid JSON", () => {
  assert.equal(parseJsonString("true"), null);
  assert.equal(parseJsonString("1"), null);
  assert.equal(parseJsonString("null"), null);
  assert.equal(parseJsonString("not json"), null);
});
