import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterPaPresent } from "../src/utils/is-hiragana-letter-pa-present";

test("isHiraganaLetterPaPresent returns true when the input contains ぱ", () => {
  assert.equal(isHiraganaLetterPaPresent("ぱん"), true);
});

test("isHiraganaLetterPaPresent returns false when the input does not contain ぱ", () => {
  assert.equal(isHiraganaLetterPaPresent("はん"), false);
});
