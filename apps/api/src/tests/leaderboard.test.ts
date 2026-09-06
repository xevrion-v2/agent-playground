import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

test("leaderboard.json is valid JSON with non-negative counts", () => {
  const path = resolve(import.meta.dirname, "../../../../leaderboard.json");
  const data = JSON.parse(readFileSync(path, "utf-8"));
  assert.ok(typeof data === "object" && data !== null && !Array.isArray(data));
  for (const [user, count] of Object.entries(data)) {
    assert.ok(typeof user === "string" && user.length > 0, `Invalid user key: ${user}`);
    assert.ok(typeof count === "number" && count >= 0 && Number.isInteger(count), `Invalid count for ${user}: ${count}`);
  }
});
