import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterBoPresent } from "../src/utils/is-hiragana-letter-bo-present";

test("isHiraganaLetterBoPresent returns true when the input contains ぼ", () => {
  assert.equal(isHiraganaLetterBoPresent("ぼく"), true);
});

test("isHiraganaLetterBoPresent returns false when the input does not contain ぼ", () => {
  assert.equal(isHiraganaLetterBoPresent("ばく"), false);
});
