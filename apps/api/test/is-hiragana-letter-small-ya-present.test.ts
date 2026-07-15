import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterSmallYaPresent } from "../src/utils/is-hiragana-letter-small-ya-present";

test("isHiraganaLetterSmallYaPresent returns true when the input contains ゃ", () => {
  assert.equal(isHiraganaLetterSmallYaPresent("きゃ"), true);
});

test("isHiraganaLetterSmallYaPresent returns false when the input does not contain ゃ", () => {
  assert.equal(isHiraganaLetterSmallYaPresent("きや"), false);
});
