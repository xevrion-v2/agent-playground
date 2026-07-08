import assert from "node:assert/strict";
import { test } from "node:test";

import {
  toCamelCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
} from "../utils/case-converter.js";

test("camel case returns empty string for null", () => {
  assert.equal(toCamelCase(null), "");
});

test("camel case returns empty string for empty input", () => {
  assert.equal(toCamelCase(""), "");
});

test("camel case returns empty string for whitespace input", () => {
  assert.equal(toCamelCase("   "), "");
});

test("camel case converts snake case", () => {
  assert.equal(toCamelCase("task_flow"), "taskFlow");
});

test("camel case converts kebab case", () => {
  assert.equal(toCamelCase("task-flow"), "taskFlow");
});

test("snake case converts camel case", () => {
  assert.equal(toSnakeCase("taskFlow"), "task_flow");
});

test("snake case converts pascal case", () => {
  assert.equal(toSnakeCase("TaskFlow"), "task_flow");
});

test("snake case converts mixed punctuation", () => {
  assert.equal(toSnakeCase("task flow! now"), "task_flow_now");
});

test("snake case returns empty string for null", () => {
  assert.equal(toSnakeCase(null), "");
});

test("kebab case converts camel case", () => {
  assert.equal(toKebabCase("taskFlow"), "task-flow");
});

test("kebab case converts pascal case", () => {
  assert.equal(toKebabCase("TaskFlow"), "task-flow");
});

test("kebab case converts spaced input", () => {
  assert.equal(toKebabCase("task flow now"), "task-flow-now");
});

test("kebab case returns empty string for null", () => {
  assert.equal(toKebabCase(null), "");
});

test("pascal case converts camel case", () => {
  assert.equal(toPascalCase("taskFlow"), "TaskFlow");
});

test("pascal case converts snake case", () => {
  assert.equal(toPascalCase("task_flow"), "TaskFlow");
});

test("pascal case converts kebab case", () => {
  assert.equal(toPascalCase("task-flow"), "TaskFlow");
});

test("pascal case returns empty string for null", () => {
  assert.equal(toPascalCase(null), "");
});

test("camel case keeps numbers", () => {
  assert.equal(toCamelCase("release_2_ready"), "release2Ready");
});

test("kebab case strips accents", () => {
  assert.equal(toKebabCase("Café au lait"), "cafe-au-lait");
});

test("camel case handles acronyms", () => {
  assert.equal(toCamelCase("HTTP server"), "httpServer");
});

test("pascal case handles acronyms", () => {
  assert.equal(toPascalCase("HTTP server"), "HttpServer");
});

test("snake case collapses repeated separators", () => {
  assert.equal(toSnakeCase("task---flow"), "task_flow");
});

test("kebab case trims separators", () => {
  assert.equal(toKebabCase("  --task flow--  "), "task-flow");
});

test("camel case handles unicode punctuation", () => {
  assert.equal(toCamelCase("task\u00A0flow"), "taskFlow");
});

test("snake case handles long mixed input", () => {
  assert.equal(toSnakeCase("Build 2026-07-04 Ready"), "build_2026_07_04_ready");
});
