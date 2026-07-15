import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterHoPresent } from "../src/utils/is-hiragana-letter-ho-present";

test("isHiraganaLetterHoPresent returns true when the input contains ほ", () => {
  assert.equal(isHiraganaLetterHoPresent("ほし"), true);
});

test("isHiraganaLetterHoPresent returns false when the input does not contain ほ", () => {
  assert.equal(isHiraganaLetterHoPresent("はし"), false);
});
