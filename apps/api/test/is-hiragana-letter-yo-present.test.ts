import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterYoPresent } from "../src/utils/is-hiragana-letter-yo-present";

test("isHiraganaLetterYoPresent returns true when the input contains よ", () => {
  assert.equal(isHiraganaLetterYoPresent("きよ"), true);
});

test("isHiraganaLetterYoPresent returns false when the input does not contain よ", () => {
  assert.equal(isHiraganaLetterYoPresent("きゆ"), false);
});
