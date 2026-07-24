import assert from "node:assert/strict";
import { test } from "node:test";

import { toKebabCase } from "./to-kebab-case.ts";

test("converts camelCase and PascalCase text to kebab case", () => {
  assert.equal(toKebabCase("userDisplayName"), "user-display-name");
  assert.equal(toKebabCase("TaskFlowAPI"), "task-flow-api");
});

test("normalizes whitespace, underscores, and repeated separators", () => {
  assert.equal(toKebabCase("  user_profile   display--name  "), "user-profile-display-name");
});

test("removes leading and trailing separators", () => {
  assert.equal(toKebabCase("__Draft Report__"), "draft-report");
});

test("treats punctuation as word separators", () => {
  assert.equal(toKebabCase("Hello, world! v2"), "hello-world-v2");
});

test("returns an empty string for blank input", () => {
  assert.equal(toKebabCase("   "), "");
});
