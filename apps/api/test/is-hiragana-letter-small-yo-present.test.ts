import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterSmallYoPresent } from "../src/utils/is-hiragana-letter-small-yo-present";

test("isHiraganaLetterSmallYoPresent returns true when the input contains ょ", () => {
  assert.equal(isHiraganaLetterSmallYoPresent("きょ"), true);
});

test("isHiraganaLetterSmallYoPresent returns false when the input does not contain ょ", () => {
  assert.equal(isHiraganaLetterSmallYoPresent("きよ"), false);
});
