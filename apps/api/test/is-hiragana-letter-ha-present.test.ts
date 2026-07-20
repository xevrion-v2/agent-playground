import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterHaPresent } from "../src/utils/is-hiragana-letter-ha-present";

test("isHiraganaLetterHaPresent returns true when the input contains は", () => {
  assert.equal(isHiraganaLetterHaPresent("はな"), true);
});

test("isHiraganaLetterHaPresent returns false when the input does not contain は", () => {
  assert.equal(isHiraganaLetterHaPresent("ひな"), false);
});
