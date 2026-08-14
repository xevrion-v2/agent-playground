import { strict as assert } from "node:assert";
import { test } from "node:test";

import { hasQuestionMarkSign } from "./has-question-mark-sign";

test("detects question mark signs", () => {
  assert.equal(hasQuestionMarkSign("what?"), true);
  assert.equal(hasQuestionMarkSign("what"), false);
});
