import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isParagraphosPresent } from "./is-paragraphos-present";

test("returns true when paragraphos char is present", () => {
  assert.equal(isParagraphosPresent("⸏ text"), true);
});

test("returns false when paragraphos char is absent", () => {
  assert.equal(isParagraphosPresent("regular text"), false);
});

test("returns false for empty string", () => {
  assert.equal(isParagraphosPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isParagraphosPresent("⸏"), true);
});
