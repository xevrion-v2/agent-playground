// Tests for case converter
const assert = require('node:assert');
const { test, describe } = require('node:test');
const { toCamelCase, toSnakeCase, toKebabCase, toPascalCase } = require('./case-converter');

describe('toCamelCase', () => {
  test('converts snake_case', () => assert.strictEqual(toCamelCase('hello_world'), 'helloWorld'));
  test('converts kebab-case', () => assert.strictEqual(toCamelCase('hello-world'), 'helloWorld'));
  test('converts spaces', () => assert.strictEqual(toCamelCase('hello world'), 'helloWorld'));
  test('handles empty string', () => assert.strictEqual(toCamelCase(''), ''));
  test('handles null', () => assert.strictEqual(toCamelCase(null), ''));
  test('handles single word', () => assert.strictEqual(toCamelCase('hello'), 'hello'));
  test('handles multiple separators', () => assert.strictEqual(toCamelCase('hello_world-test'), 'helloWorldTest'));
});

describe('toSnakeCase', () => {
  test('converts camelCase', () => assert.strictEqual(toSnakeCase('helloWorld'), 'hello_world'));
  test('converts kebab-case', () => assert.strictEqual(toSnakeCase('hello-world'), 'hello_world'));
  test('converts spaces', () => assert.strictEqual(toSnakeCase('hello world'), 'hello_world'));
  test('handles empty', () => assert.strictEqual(toSnakeCase(''), ''));
  test('handles null', () => assert.strictEqual(toSnakeCase(null), ''));
  test('handles multiple words', () => assert.strictEqual(toSnakeCase('helloWorldTest'), 'hello_world_test'));
  test('handles single word', () => assert.strictEqual(toSnakeCase('hello'), 'hello'));
});

describe('toKebabCase', () => {
  test('converts camelCase', () => assert.strictEqual(toKebabCase('helloWorld'), 'hello-world'));
  test('converts snake_case', () => assert.strictEqual(toKebabCase('hello_world'), 'hello-world'));
  test('converts spaces', () => assert.strictEqual(toKebabCase('hello world'), 'hello-world'));
  test('handles empty', () => assert.strictEqual(toKebabCase(''), ''));
  test('handles null', () => assert.strictEqual(toKebabCase(null), ''));
  test('handles multiple', () => assert.strictEqual(toKebabCase('helloWorldTest'), 'hello-world-test'));
});

describe('toPascalCase', () => {
  test('converts snake_case', () => assert.strictEqual(toPascalCase('hello_world'), 'HelloWorld'));
  test('converts kebab-case', () => assert.strictEqual(toPascalCase('hello-world'), 'HelloWorld'));
  test('converts camelCase', () => assert.strictEqual(toPascalCase('helloWorld'), 'HelloWorld'));
  test('handles empty', () => assert.strictEqual(toPascalCase(''), ''));
  test('handles null', () => assert.strictEqual(toPascalCase(null), ''));
});

