import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterNePresent } from "../src/utils/is-hiragana-letter-ne-present";

test("isHiraganaLetterNePresent returns true when the input contains ね", () => {
  assert.equal(isHiraganaLetterNePresent("ねこ"), true);
});

test("isHiraganaLetterNePresent returns false when the input does not contain ね", () => {
  assert.equal(isHiraganaLetterNePresent("のこ"), false);
});
