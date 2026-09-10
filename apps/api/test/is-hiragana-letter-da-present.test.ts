import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterDaPresent } from "../src/utils/is-hiragana-letter-da-present";

test("isHiraganaLetterDaPresent returns true when the input contains だ", () => {
  assert.equal(isHiraganaLetterDaPresent("だん"), true);
});

test("isHiraganaLetterDaPresent returns false when the input does not contain だ", () => {
  assert.equal(isHiraganaLetterDaPresent("たん"), false);
});
