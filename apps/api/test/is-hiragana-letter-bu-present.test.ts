import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterBuPresent } from "../src/utils/is-hiragana-letter-bu-present";

test("isHiraganaLetterBuPresent returns true when the input contains ぶ", () => {
  assert.equal(isHiraganaLetterBuPresent("ぶた"), true);
});

test("isHiraganaLetterBuPresent returns false when the input does not contain ぶ", () => {
  assert.equal(isHiraganaLetterBuPresent("ふた"), false);
});
