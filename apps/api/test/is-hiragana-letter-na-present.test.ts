import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterNaPresent } from "../src/utils/is-hiragana-letter-na-present";

test("isHiraganaLetterNaPresent returns true when the input contains な", () => {
  assert.equal(isHiraganaLetterNaPresent("なつ"), true);
});

test("isHiraganaLetterNaPresent returns false when the input does not contain な", () => {
  assert.equal(isHiraganaLetterNaPresent("たつ"), false);
});
