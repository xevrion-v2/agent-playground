import { strict as assert } from "node:assert";
import { test } from "node:test";

import { isEditorialCoronisPresent } from "./is-editorial-coronis-present";

test("returns true when editorial coronis char is present", () => {
  assert.equal(isEditorialCoronisPresent("⸎ ending"), true);
});

test("returns false when editorial coronis char is absent", () => {
  assert.equal(isEditorialCoronisPresent("nothing special"), false);
});

test("returns false for empty string", () => {
  assert.equal(isEditorialCoronisPresent(""), false);
});

test("returns true for string that is just the char", () => {
  assert.equal(isEditorialCoronisPresent("⸎"), true);
});
