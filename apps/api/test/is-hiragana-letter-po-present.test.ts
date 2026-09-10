import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterPoPresent } from "../src/utils/is-hiragana-letter-po-present";

test("isHiraganaLetterPoPresent returns true when the input contains ぽ", () => {
  assert.equal(isHiraganaLetterPoPresent("ぽけっと"), true);
});

test("isHiraganaLetterPoPresent returns false when the input does not contain ぽ", () => {
  assert.equal(isHiraganaLetterPoPresent("ぱけっと"), false);
});
