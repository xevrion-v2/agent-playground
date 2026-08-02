import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterRuPresent } from "../src/utils/is-hiragana-letter-ru-present";

test("isHiraganaLetterRuPresent returns true when the input contains る", () => {
  assert.equal(isHiraganaLetterRuPresent("さる"), true);
});

test("isHiraganaLetterRuPresent returns false when the input does not contain る", () => {
  assert.equal(isHiraganaLetterRuPresent("さと"), false);
});
