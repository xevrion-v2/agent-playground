import { strict as assert } from "node:assert";
import { test } from "node:test";

import { parseJsonNumber } from "./parse-json-number";

test("parses finite JSON numbers", () => {
  assert.equal(parseJsonNumber("0"), 0);
  assert.equal(parseJsonNumber("1.5"), 1.5);
  assert.equal(parseJsonNumber("-2"), -2);
});

test("returns null for non-number or invalid JSON", () => {
  assert.equal(parseJsonNumber("true"), null);
  assert.equal(parseJsonNumber('"1"'), null);
  assert.equal(parseJsonNumber("null"), null);
  assert.equal(parseJsonNumber("not json"), null);
  assert.equal(parseJsonNumber("1e999"), null);
});
