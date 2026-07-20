import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterPiPresent } from "../src/utils/is-hiragana-letter-pi-present";

test("isHiraganaLetterPiPresent returns true when the input contains ぴ", () => {
  assert.equal(isHiraganaLetterPiPresent("ぴょ"), true);
});

test("isHiraganaLetterPiPresent returns false when the input does not contain ぴ", () => {
  assert.equal(isHiraganaLetterPiPresent("ひょ"), false);
});
