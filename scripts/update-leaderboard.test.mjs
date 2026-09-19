import { test } from "node:test";
import assert from "node:assert/strict";

import { incrementContributor } from "./update-leaderboard.mjs";

test("adds a new contributor with a count of 1", () => {
  assert.deepEqual(incrementContributor({}, "ada"), { ada: 1 });
});

test("increments an existing contributor", () => {
  assert.deepEqual(incrementContributor({ ada: 2 }, "ada"), { ada: 3 });
});

test("preserves other contributors' counts", () => {
  assert.deepEqual(incrementContributor({ bob: 5 }, "ada"), { bob: 5, ada: 1 });
});

test("does not mutate the input leaderboard", () => {
  const input = { ada: 1 };
  incrementContributor(input, "ada");
  assert.deepEqual(input, { ada: 1 });
});

test("throws on an empty or non-string username", () => {
  assert.throws(() => incrementContributor({}, ""));
  assert.throws(() => incrementContributor({}, undefined));
});
