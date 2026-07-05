import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isForkedParagraphosPresent } from "./is-forked-paragraphos-present";

test("returns true when forked paragraphos char is present", () => {
  assert.equal(isForkedParagraphosPresent("⸐ here"), true);
});

test("returns false when forked paragraphos char is absent", () => {
  assert.equal(isForkedParagraphosPresent("no special chars"), false);
});

test("returns false for empty string", () => {
  assert.equal(isForkedParagraphosPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isForkedParagraphosPresent("⸐"), true);
});
