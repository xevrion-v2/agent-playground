import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterBaPresent } from "../src/utils/is-hiragana-letter-ba-present";

test("isHiraganaLetterBaPresent returns true when the input contains ば", () => {
  assert.equal(isHiraganaLetterBaPresent("ばな"), true);
});

test("isHiraganaLetterBaPresent returns false when the input does not contain ば", () => {
  assert.equal(isHiraganaLetterBaPresent("はな"), false);
});
