import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isLeftToRightEmbeddingPresent } from "./is-left-to-right-embedding-present";

test("detects left-to-right embedding characters", () => {
  assert.equal(isLeftToRightEmbeddingPresent(`a\u202Ab`), true);
  assert.equal(isLeftToRightEmbeddingPresent("ab"), false);
  assert.equal(isLeftToRightEmbeddingPresent(""), false);
});
