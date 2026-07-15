import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterNoPresent } from "../src/utils/is-hiragana-letter-no-present";

test("isHiraganaLetterNoPresent returns true when the input contains の", () => {
  assert.equal(isHiraganaLetterNoPresent("のり"), true);
});

test("isHiraganaLetterNoPresent returns false when the input does not contain の", () => {
  assert.equal(isHiraganaLetterNoPresent("なり"), false);
});
