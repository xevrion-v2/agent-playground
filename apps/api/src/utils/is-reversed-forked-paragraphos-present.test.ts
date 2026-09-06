import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isReversedForkedParagraphosPresent } from "./is-reversed-forked-paragraphos-present";

test("returns true when reversed forked paragraphos char is present", () => {
  assert.equal(isReversedForkedParagraphosPresent("⸑ text"), true);
});

test("returns false when reversed forked paragraphos char is absent", () => {
  assert.equal(isReversedForkedParagraphosPresent("plain text"), false);
});

test("returns false for empty string", () => {
  assert.equal(isReversedForkedParagraphosPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isReversedForkedParagraphosPresent("⸑"), true);
});
