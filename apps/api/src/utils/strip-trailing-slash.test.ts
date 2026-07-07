import assert from "node:assert/strict";
import test from "node:test";

import { stripTrailingSlash } from "./strip-trailing-slash";

test("returns empty string unchanged", () => {
  assert.equal(stripTrailingSlash(""), "");
});

test("keeps the root slash intact", () => {
  assert.equal(stripTrailingSlash("/"), "/");
});

test("removes trailing slashes from paths and urls", () => {
  assert.equal(stripTrailingSlash("users/"), "users");
  assert.equal(stripTrailingSlash("users///"), "users");
  assert.equal(stripTrailingSlash("https://example.com/"), "https://example.com");
});

test("keeps a bare scheme root intact", () => {
  assert.equal(stripTrailingSlash("https://"), "https://");
});
