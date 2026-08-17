const assert = require('node:assert/strict');
const test = require('node:test');

const { toCamelCase, toKebabCase, toPascalCase, toSnakeCase } = require('./case-converter');

test('toCamelCase converts a simple sentence', () => {
  assert.equal(toCamelCase('hello world'), 'helloWorld');
});

test('toCamelCase converts snake case', () => {
  assert.equal(toCamelCase('hello_world'), 'helloWorld');
});

test('toCamelCase converts kebab case', () => {
  assert.equal(toCamelCase('hello-world'), 'helloWorld');
});

test('toCamelCase converts pascal case', () => {
  assert.equal(toCamelCase('HelloWorld'), 'helloWorld');
});

test('toCamelCase lowercases acronyms', () => {
  assert.equal(toCamelCase('API response'), 'apiResponse');
});

test('toCamelCase returns empty string for null', () => {
  assert.equal(toCamelCase(null), '');
});

test('toCamelCase returns empty string for empty input', () => {
  assert.equal(toCamelCase(''), '');
});

test('toSnakeCase converts a simple sentence', () => {
  assert.equal(toSnakeCase('hello world'), 'hello_world');
});

test('toSnakeCase converts camel case', () => {
  assert.equal(toSnakeCase('helloWorld'), 'hello_world');
});

test('toSnakeCase converts pascal case', () => {
  assert.equal(toSnakeCase('HelloWorld'), 'hello_world');
});

test('toSnakeCase collapses repeated whitespace', () => {
  assert.equal(toSnakeCase('hello   world'), 'hello_world');
});

test('toSnakeCase trims surrounding separators', () => {
  assert.equal(toSnakeCase('__hello-world__'), 'hello_world');
});

test('toSnakeCase returns empty string for null', () => {
  assert.equal(toSnakeCase(null), '');
});

test('toKebabCase converts a simple sentence', () => {
  assert.equal(toKebabCase('hello world'), 'hello-world');
});

test('toKebabCase converts snake case', () => {
  assert.equal(toKebabCase('hello_world'), 'hello-world');
});

test('toKebabCase converts camel case', () => {
  assert.equal(toKebabCase('helloWorld'), 'hello-world');
});

test('toKebabCase converts mixed separators', () => {
  assert.equal(toKebabCase('hello_world again'), 'hello-world-again');
});

test('toKebabCase returns empty string for empty input', () => {
  assert.equal(toKebabCase(''), '');
});

test('toPascalCase converts a simple sentence', () => {
  assert.equal(toPascalCase('hello world'), 'HelloWorld');
});

test('toPascalCase converts snake case', () => {
  assert.equal(toPascalCase('hello_world'), 'HelloWorld');
});

test('toPascalCase converts camel case', () => {
  assert.equal(toPascalCase('helloWorld'), 'HelloWorld');
});

test('toPascalCase converts kebab case', () => {
  assert.equal(toPascalCase('hello-world'), 'HelloWorld');
});

test('toPascalCase returns empty string for null', () => {
  assert.equal(toPascalCase(null), '');
});

test('case converters preserve numbers', () => {
  assert.equal(toSnakeCase('version 2 value'), 'version_2_value');
});

test('case converters ignore punctuation', () => {
  assert.equal(toCamelCase('hello, world!'), 'helloWorld');
});
