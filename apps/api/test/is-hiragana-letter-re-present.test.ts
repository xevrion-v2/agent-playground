import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterRePresent } from "../src/utils/is-hiragana-letter-re-present";

test("isHiraganaLetterRePresent returns true when the input contains a hiragana re character", () => {
  assert.equal(isHiraganaLetterRePresent("ひらがなれ"), true);
});

test("isHiraganaLetterRePresent returns false when the input does not contain a hiragana re character", () => {
  assert.equal(isHiraganaLetterRePresent("hiragana sample"), false);
});
