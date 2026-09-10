import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterMePresent } from "../src/utils/is-hiragana-letter-me-present";

test("isHiraganaLetterMePresent returns true when the input contains め", () => {
  assert.equal(isHiraganaLetterMePresent("めい"), true);
});

test("isHiraganaLetterMePresent returns false when the input does not contain め", () => {
  assert.equal(isHiraganaLetterMePresent("みい"), false);
});
