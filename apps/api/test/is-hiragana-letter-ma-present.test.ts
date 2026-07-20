import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterMaPresent } from "../src/utils/is-hiragana-letter-ma-present";

test("isHiraganaLetterMaPresent returns true when the input contains ま", () => {
  assert.equal(isHiraganaLetterMaPresent("まち"), true);
});

test("isHiraganaLetterMaPresent returns false when the input does not contain ま", () => {
  assert.equal(isHiraganaLetterMaPresent("みち"), false);
});
