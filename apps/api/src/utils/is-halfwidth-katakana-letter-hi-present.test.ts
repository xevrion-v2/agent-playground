import assert from "node:assert/strict";

import { isHalfwidthKatakanaLetterHiPresent } from "./is-halfwidth-katakana-letter-hi-present";

assert.equal(isHalfwidthKatakanaLetterHiPresent("prefix \uFF8B suffix"), true);
assert.equal(isHalfwidthKatakanaLetterHiPresent("\uFF8B"), true);
assert.equal(isHalfwidthKatakanaLetterHiPresent(""), false);
assert.equal(isHalfwidthKatakanaLetterHiPresent("prefix suffix"), false);
assert.equal(isHalfwidthKatakanaLetterHiPresent("\uFF8A"), false);
assert.equal(isHalfwidthKatakanaLetterHiPresent("\u30D2"), false);
