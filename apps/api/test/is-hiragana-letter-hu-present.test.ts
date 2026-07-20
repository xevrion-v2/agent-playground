import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterHuPresent } from "../src/utils/is-hiragana-letter-hu-present";

test("isHiraganaLetterHuPresent returns true when the input contains ふ", () => {
  assert.equal(isHiraganaLetterHuPresent("ふね"), true);
});

test("isHiraganaLetterHuPresent returns false when the input does not contain ふ", () => {
  assert.equal(isHiraganaLetterHuPresent("へね"), false);
});
