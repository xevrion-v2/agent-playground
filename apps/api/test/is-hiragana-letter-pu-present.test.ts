import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterPuPresent } from "../src/utils/is-hiragana-letter-pu-present";

test("isHiraganaLetterPuPresent returns true when the input contains ぷ", () => {
  assert.equal(isHiraganaLetterPuPresent("ぷか"), true);
});

test("isHiraganaLetterPuPresent returns false when the input does not contain ぷ", () => {
  assert.equal(isHiraganaLetterPuPresent("ふか"), false);
});
