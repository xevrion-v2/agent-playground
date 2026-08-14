import assert from "node:assert/strict";
import test from "node:test";

import { isHorizontalEllipsisPresent } from "./is-horizontal-ellipsis-present.ts";

test("detects the Unicode horizontal ellipsis", () => {
  assert.equal(isHorizontalEllipsisPresent("Loading…"), true);
});

test("does not treat three ASCII periods as a horizontal ellipsis", () => {
  assert.equal(isHorizontalEllipsisPresent("Loading..."), false);
});

test("returns false when the character is absent", () => {
  assert.equal(isHorizontalEllipsisPresent("Loading"), false);
});
