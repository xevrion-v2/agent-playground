import { strict as assert } from "node:assert";
import { test } from "node:test";

import { groupByKey } from "./group-by-key";

test("groups values by key", () => {
  const values = ["ant", "ape", "bear", "bat"] as const;
  const grouped = groupByKey(values, (value) => value[0]);

  assert.deepEqual({ ...grouped }, {
    a: ["ant", "ape"],
    b: ["bear", "bat"],
  });
});

test("returns an empty object for empty input", () => {
  const grouped = groupByKey([], (value: never) => value);

  assert.deepEqual({ ...grouped }, {});
});

test("preserves insertion order within each group", () => {
  const values = [
    { kind: "x", value: 1 },
    { kind: "y", value: 2 },
    { kind: "x", value: 3 },
  ] as const;

  const grouped = groupByKey(values, (value) => value.kind);

  assert.deepEqual({ ...grouped }, {
    x: [
      { kind: "x", value: 1 },
      { kind: "x", value: 3 },
    ],
    y: [
      { kind: "y", value: 2 },
    ],
  });
});
