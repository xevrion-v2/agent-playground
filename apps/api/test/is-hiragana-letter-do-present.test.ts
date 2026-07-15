import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterDoPresent } from "../src/utils/is-hiragana-letter-do-present";

test("isHiraganaLetterDoPresent returns true when the input contains ど", () => {
  assert.equal(isHiraganaLetterDoPresent("どら"), true);
});

test("isHiraganaLetterDoPresent returns false when the input does not contain ど", () => {
  assert.equal(isHiraganaLetterDoPresent("とら"), false);
});
