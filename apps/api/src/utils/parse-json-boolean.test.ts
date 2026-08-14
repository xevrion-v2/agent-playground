import { strict as assert } from "node:assert";
import { test } from "node:test";

import { parseJsonBoolean } from "./parse-json-boolean";

test("parses boolean JSON values", () => {
  assert.equal(parseJsonBoolean("true"), true);
  assert.equal(parseJsonBoolean("false"), false);
});

test("returns null for non-boolean or invalid JSON", () => {
  assert.equal(parseJsonBoolean('"true"'), null);
  assert.equal(parseJsonBoolean("1"), null);
  assert.equal(parseJsonBoolean("not json"), null);
});
