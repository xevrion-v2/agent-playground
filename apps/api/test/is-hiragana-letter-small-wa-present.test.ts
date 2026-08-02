import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterSmallWaPresent } from "../src/utils/is-hiragana-letter-small-wa-present";

test("isHiraganaLetterSmallWaPresent returns true when the input contains a small wa hiragana character", () => {
  assert.equal(isHiraganaLetterSmallWaPresent("きゃんぃゎで"), true);
});

test("isHiraganaLetterSmallWaPresent returns false when the input does not contain a small wa hiragana character", () => {
  assert.equal(isHiraganaLetterSmallWaPresent("kana sample"), false);
});
