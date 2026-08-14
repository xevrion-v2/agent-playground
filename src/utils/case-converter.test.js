const test = require("node:test");
const assert = require("node:assert/strict");
const { toCamelCase, toSnakeCase, toKebabCase, toPascalCase } = require("./case-converter");

test("camel from snake", () => {
  assert.equal(toCamelCase("hello_world"), "helloWorld");
});

test("camel from kebab", () => {
  assert.equal(toCamelCase("hello-world"), "helloWorld");
});

test("camel from spaces", () => {
  assert.equal(toCamelCase("hello world"), "helloWorld");
});

test("pascal from snake", () => {
  assert.equal(toPascalCase("hello_world"), "HelloWorld");
});

test("pascal from kebab", () => {
  assert.equal(toPascalCase("hello-world"), "HelloWorld");
});

test("snake from camel", () => {
  assert.equal(toSnakeCase("helloWorld"), "hello_world");
});

test("snake from pascal", () => {
  assert.equal(toSnakeCase("HelloWorld"), "hello_world");
});

test("kebab from camel", () => {
  assert.equal(toKebabCase("helloWorld"), "hello-world");
});

test("kebab from snake", () => {
  assert.equal(toKebabCase("hello_world"), "hello-world");
});

test("null camel", () => {
  assert.equal(toCamelCase(null), "");
});

test("empty camel", () => {
  assert.equal(toCamelCase(""), "");
});

test("null snake", () => {
  assert.equal(toSnakeCase(null), "");
});

test("empty snake", () => {
  assert.equal(toSnakeCase(""), "");
});

test("null kebab", () => {
  assert.equal(toKebabCase(null), "");
});

test("empty kebab", () => {
  assert.equal(toKebabCase(""), "");
});

test("null pascal", () => {
  assert.equal(toPascalCase(null), "");
});

test("empty pascal", () => {
  assert.equal(toPascalCase(""), "");
});

test("single word camel", () => {
  assert.equal(toCamelCase("agent"), "agent");
});

test("single word pascal", () => {
  assert.equal(toPascalCase("agent"), "Agent");
});

test("multi segment snake", () => {
  assert.equal(toSnakeCase("fooBarBaz"), "foo_bar_baz");
});

test("multi segment kebab", () => {
  assert.equal(toKebabCase("fooBarBaz"), "foo-bar-baz");
});

test("already snake snake", () => {
  assert.equal(toSnakeCase("already_snake"), "already_snake");
});

test("already kebab kebab", () => {
  assert.equal(toKebabCase("already-kebab"), "already-kebab");
});

test("mixed separators", () => {
  assert.equal(toCamelCase("foo-bar_baz"), "fooBarBaz");
});

test("pascal from spaces", () => {
  assert.equal(toPascalCase("foo bar"), "FooBar");
});
