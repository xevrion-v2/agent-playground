import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterPePresent } from "../src/utils/is-hiragana-letter-pe-present";

test("isHiraganaLetterPePresent returns true when the input contains ぺ", () => {
  assert.equal(isHiraganaLetterPePresent("ぺた"), true);
});

test("isHiraganaLetterPePresent returns false when the input does not contain ぺ", () => {
  assert.equal(isHiraganaLetterPePresent("へた"), false);
});
