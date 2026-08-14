import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterRoPresent } from "../src/utils/is-hiragana-letter-ro-present";

test("isHiraganaLetterRoPresent returns true when the input contains a hiragana ro character", () => {
  assert.equal(isHiraganaLetterRoPresent("ひらがなろ"), true);
});

test("isHiraganaLetterRoPresent returns false when the input does not contain a hiragana ro character", () => {
  assert.equal(isHiraganaLetterRoPresent("hiragana sample"), false);
});
