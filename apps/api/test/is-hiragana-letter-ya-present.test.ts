import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterYaPresent } from "../src/utils/is-hiragana-letter-ya-present";

test("isHiraganaLetterYaPresent returns true when the input contains や", () => {
  assert.equal(isHiraganaLetterYaPresent("やま"), true);
});

test("isHiraganaLetterYaPresent returns false when the input does not contain や", () => {
  assert.equal(isHiraganaLetterYaPresent("よま"), false);
});
