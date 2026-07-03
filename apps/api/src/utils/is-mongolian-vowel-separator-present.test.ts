import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isMongolianVowelSeparatorPresent } from "./is-mongolian-vowel-separator-present";

test("detects mongolian vowel separator characters", () => {
  assert.equal(isMongolianVowelSeparatorPresent(`a\u180Eb`), true);
  assert.equal(isMongolianVowelSeparatorPresent("ab"), false);
  assert.equal(isMongolianVowelSeparatorPresent(""), false);
});
