import assert from "node:assert/strict";
import test from "node:test";

import { compactRecord } from "./compact-record.js";

test("removes null and undefined values from a record", () => {
  assert.deepEqual(
    compactRecord({
      name: "agent",
      missing: null,
      stale: undefined,
      score: 42,
    }),
    {
      name: "agent",
      score: 42,
    },
  );
});

test("preserves falsy values that are still present", () => {
  assert.deepEqual(
    compactRecord({
      empty: "",
      enabled: false,
      count: 0,
      nullable: null,
    }),
    {
      empty: "",
      enabled: false,
      count: 0,
    },
  );
});

test("returns a new object without mutating the original record", () => {
  const original = {
    keep: "value",
    drop: null,
  };

  const compacted = compactRecord(original);

  assert.notEqual(compacted, original);
  assert.deepEqual(original, {
    keep: "value",
    drop: null,
  });
  assert.deepEqual(compacted, {
    keep: "value",
  });
});
