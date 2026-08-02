import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterSmallYuPresent } from "../src/utils/is-hiragana-letter-small-yu-present";

test("isHiraganaLetterSmallYuPresent returns true when the input contains ゅ", () => {
  assert.equal(isHiraganaLetterSmallYuPresent("きゅ"), true);
});

test("isHiraganaLetterSmallYuPresent returns false when the input does not contain ゅ", () => {
  assert.equal(isHiraganaLetterSmallYuPresent("きゆ"), false);
});
