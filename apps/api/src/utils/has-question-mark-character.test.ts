import assert from "node:assert/strict";
import test from "node:test";

import { hasQuestionMarkCharacter } from "./has-question-mark-character";

test("returns true when the question mark character is present", () => {
  assert.equal(hasQuestionMarkCharacter("what?"), true);
});

test("returns false when the question mark character is absent", () => {
  assert.equal(hasQuestionMarkCharacter("what"), false);
});
