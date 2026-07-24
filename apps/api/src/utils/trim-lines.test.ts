import assert from "node:assert/strict";
import test from "node:test";

import { trimLines } from "./trim-lines.ts";

test("trims each line and drops empty entries", () => {
  assert.deepEqual(trimLines("  first  \n\n second \r\n\tthird\t"), [
    "first",
    "second",
    "third",
  ]);
});

test("returns an empty array for blank multiline text", () => {
  assert.deepEqual(trimLines(" \n\t\r\n  "), []);
});

test("preserves meaningful internal spacing after edge trimming", () => {
  assert.deepEqual(trimLines(" keep  inner  spaces \n next\tvalue "), [
    "keep  inner  spaces",
    "next\tvalue",
  ]);
});
