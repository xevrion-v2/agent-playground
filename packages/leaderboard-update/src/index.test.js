import assert from "node:assert/strict";
import test from "node:test";

import { updateLeaderboard } from "./index.js";

test("new contributors start at 1", () => {
  assert.deepEqual(updateLeaderboard({}, "new-user"), {
    "new-user": 1
  });
});

test("existing contributors increment by 1", () => {
  assert.deepEqual(updateLeaderboard({ "existing-user": 4 }, "existing-user"), {
    "existing-user": 5
  });
});
