import assert from "node:assert/strict";
import { test } from "node:test";

import { isHiraganaLetterZuPresent } from "../src/utils/is-hiragana-letter-zu-present";

test("isHiraganaLetterZuPresent returns true when the input contains ず", () => {
  assert.equal(isHiraganaLetterZuPresent("ずし"), true);
});

test("isHiraganaLetterZuPresent returns false when the input does not contain ず", () => {
  assert.equal(isHiraganaLetterZuPresent("すし"), false);
});
