import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterZoPresent } from "../src/utils/is-hiragana-letter-zo-present";

test("isHiraganaLetterZoPresent returns true when the input contains ぞ", () => {
  assert.equal(isHiraganaLetterZoPresent("ぞう"), true);
});

test("isHiraganaLetterZoPresent returns false when the input does not contain ぞ", () => {
  assert.equal(isHiraganaLetterZoPresent("そう"), false);
});
