import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterDiPresent } from "../src/utils/is-hiragana-letter-di-present";

test("isHiraganaLetterDiPresent returns true when the input contains ぢ", () => {
  assert.equal(isHiraganaLetterDiPresent("ぢか"), true);
});

test("isHiraganaLetterDiPresent returns false when the input does not contain ぢ", () => {
  assert.equal(isHiraganaLetterDiPresent("じか"), false);
});
