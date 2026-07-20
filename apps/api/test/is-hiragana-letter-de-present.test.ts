import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterDePresent } from "../src/utils/is-hiragana-letter-de-present";

test("isHiraganaLetterDePresent returns true when the input contains で", () => {
  assert.equal(isHiraganaLetterDePresent("でん"), true);
});

test("isHiraganaLetterDePresent returns false when the input does not contain で", () => {
  assert.equal(isHiraganaLetterDePresent("てん"), false);
});
