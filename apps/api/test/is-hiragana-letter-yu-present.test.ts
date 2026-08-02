import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterYuPresent } from "../src/utils/is-hiragana-letter-yu-present";

test("isHiraganaLetterYuPresent returns true when the input contains ゆ", () => {
  assert.equal(isHiraganaLetterYuPresent("ゆう"), true);
});

test("isHiraganaLetterYuPresent returns false when the input does not contain ゆ", () => {
  assert.equal(isHiraganaLetterYuPresent("きょう"), false);
});
