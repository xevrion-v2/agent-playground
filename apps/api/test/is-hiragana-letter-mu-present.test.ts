import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterMuPresent } from "../src/utils/is-hiragana-letter-mu-present";

test("isHiraganaLetterMuPresent returns true when the input contains む", () => {
  assert.equal(isHiraganaLetterMuPresent("むぎ"), true);
});

test("isHiraganaLetterMuPresent returns false when the input does not contain む", () => {
  assert.equal(isHiraganaLetterMuPresent("みぎ"), false);
});
