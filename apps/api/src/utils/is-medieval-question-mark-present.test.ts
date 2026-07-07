import assert from "node:assert/strict";
import test from "node:test";

import { isMedievalQuestionMarkPresent } from "./is-medieval-question-mark-present";

test("returns true when the medieval question mark character is present", () => {
  assert.equal(isMedievalQuestionMarkPresent(`abc\u2e54def`), true);
  assert.equal(isMedievalQuestionMarkPresent("abcdef"), false);
  assert.equal(isMedievalQuestionMarkPresent("abc"), false);
});
