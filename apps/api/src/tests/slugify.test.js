import assert from "node:assert/strict";
import { test } from "node:test";

import { slugify } from "../utils/slugify.js";

test("returns empty string for nullish input", () => {
  assert.equal(slugify(null), "");
});

test("returns empty string for empty text", () => {
  assert.equal(slugify(""), "");
});

test("lowercases basic words", () => {
  assert.equal(slugify("Task Flow"), "task-flow");
});

test("removes extra whitespace", () => {
  assert.equal(slugify("  task   flow  "), "task-flow");
});

test("removes punctuation", () => {
  assert.equal(slugify("Task Flow!"), "task-flow");
});

test("keeps digits", () => {
  assert.equal(slugify("Release 2"), "release-2");
});

test("collapses repeated separators", () => {
  assert.equal(slugify("task---flow"), "task-flow");
});

test("trims leading separators", () => {
  assert.equal(slugify("---task flow"), "task-flow");
});

test("trims trailing separators", () => {
  assert.equal(slugify("task flow---"), "task-flow");
});

test("strips accents", () => {
  assert.equal(slugify("Café au lait"), "cafe-au-lait");
});

test("strips umlauts", () => {
  assert.equal(slugify("Führer"), "fuhrer");
});

test("normalizes commas and slashes", () => {
  assert.equal(slugify("task,flow/step"), "task-flow-step");
});

test("handles mixed symbols", () => {
  assert.equal(slugify("Task @ Flow #1"), "task-flow-1");
});

test("returns empty string when only punctuation is provided", () => {
  assert.equal(slugify("!!!"), "");
});

test("supports already slugged text", () => {
  assert.equal(slugify("task-flow"), "task-flow");
});

test("handles tabs and newlines", () => {
  assert.equal(slugify("task\tflow\nnow"), "task-flow-now");
});

test("handles leading and trailing spaces around symbols", () => {
  assert.equal(slugify("  task - flow  "), "task-flow");
});

test("keeps long numeric sequences", () => {
  assert.equal(slugify("Build 2026 07 04"), "build-2026-07-04");
});

test("converts unicode space-like separators", () => {
  assert.equal(slugify("task\u00A0flow"), "task-flow");
});

test("handles camel case inputs", () => {
  assert.equal(slugify("TaskFlow"), "taskflow");
});

test("treats booleans as strings", () => {
  assert.equal(slugify(true), "true");
});

test("treats numbers as strings", () => {
  assert.equal(slugify(42), "42");
});
