import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isWordJoinerPresent } from "./is-word-joiner-present";

test("detects word joiner characters", () => {
  assert.equal(isWordJoinerPresent(`a\u2060b`), true);
  assert.equal(isWordJoinerPresent("ab"), false);
  assert.equal(isWordJoinerPresent(""), false);
});
